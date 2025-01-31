import { generateResponse } from '../services/deepseekService';
import { IMessage } from '../services/qroqService';
import { SYSTEM_PROMPT, DEEPSEEK_API_KEY } from '../config/environment';

describe('deepseekService', () => {
    beforeAll(() => {
        if (!SYSTEM_PROMPT) {
            console.warn('SYSTEM_PROMPT tidak diatur. Tes mungkin gagal.');
        }
        if (!DEEPSEEK_API_KEY) {
            console.warn('DEEPSEEK_API_KEY tidak diatur. Tes mungkin gagal.');
        }
    });

    describe('generateResponse', () => {
        it('should generate a response with string input', async () => {
            const prompt = 'Halo, bisakah kamu memberikan fakta menarik tentang luar angkasa?';

            try {
                const result = await generateResponse(prompt);

                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);

                console.log('Respons dari Deepseek (string input): \n', result);
            } catch (error) {
                console.error('Error saat menguji Deepseek API:', error);
                throw error;
            }
        }, 60 * 1000); // 60 detik timeout karena Deepseek bisa lebih lambat

        it('should generate a response with message array input', async () => {
            const messages: IMessage[] = [
                {
                    id: '1',
                    role: 'user',
                    content: 'Siapa presiden pertama Indonesia?',
                    replyId: null,
                    createdAt: new Date()
                },
                {
                    id: '2',
                    role: 'assistant',
                    content: 'Presiden pertama Indonesia adalah Ir. Soekarno.',
                    replyId: '1',
                    createdAt: new Date()
                },
                {
                    id: '3',
                    role: 'user',
                    content: 'Kapan beliau menjabat?',
                    replyId: '2',
                    createdAt: new Date()
                }
            ];

            try {
                const result = await generateResponse(messages);

                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);

                console.log('Respons dari Deepseek (message array input): \n', result);
            } catch (error) {
                console.error('Error saat menguji Deepseek API:', error);
                throw error;
            }
        }, 60 * 1000);

        it('should handle API errors gracefully', async () => {
            // Simpan API key asli
            const originalApiKey = process.env.DEEPSEEK_API_KEY;
            
            try {
                // Set API key palsu untuk memicu error
                process.env.DEEPSEEK_API_KEY = 'invalid_key';
                
                await expect(generateResponse('Test prompt'))
                    .rejects
                    .toThrow();
                
            } finally {
                // Kembalikan API key asli
                process.env.DEEPSEEK_API_KEY = originalApiKey;
            }
        });

        it('should handle long conversations', async () => {
            const messages: IMessage[] = Array.from({ length: 10 }, (_, i) => ({
                id: i.toString(),
                role: i % 2 === 0 ? 'user' : 'assistant',
                content: `Pesan ke-${i + 1} dalam percakapan panjang ini.`,
                replyId: i === 0 ? null : (i - 1).toString(),
                createdAt: new Date(Date.now() - (10 - i) * 1000) // Pesan diatur berurutan dengan interval 1 detik
            }));

            try {
                const result = await generateResponse(messages);

                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);

                console.log('Respons dari Deepseek (long conversation): \n', result);
            } catch (error) {
                console.error('Error saat menguji Deepseek API dengan percakapan panjang:', error);
                throw error;
            }
        }, 60 * 1000);
    });
}); 