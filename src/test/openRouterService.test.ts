import { generateResponse } from '../services/openRouterService';
import { IMessage } from '../services/qroqService';
import { SYSTEM_PROMPT, OPENROUTER_API_KEY } from '../config/environment';

describe('openRouterService', () => {
    beforeAll(() => {
        if (!SYSTEM_PROMPT) {
            console.warn('SYSTEM_PROMPT tidak diatur. Tes mungkin gagal.');
        }
        if (!OPENROUTER_API_KEY) {
            console.warn('OPENROUTER_API_KEY tidak diatur. Tes mungkin gagal.');
        }
    });

    describe('generateResponse', () => {
        it('should generate a response with string input', async () => {
            const prompt = 'Halo, bisakah kamu memberikan fakta menarik tentang luar angkasa?';

            try {
                const result = await generateResponse(prompt);

                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);

                console.log('Respons dari OpenRouter (string input): \n', result);
            } catch (error) {
                console.error('Error saat menguji OpenRouter API:', error);
                throw error;
            }
        }, 60 * 1000);

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

                console.log('Respons dari OpenRouter (message array input): \n', result);
            } catch (error) {
                console.error('Error saat menguji OpenRouter API:', error);
                throw error;
            }
        }, 30000);

        it('should handle API errors gracefully', async () => {
            // Simpan API key asli
            const originalApiKey = process.env.OPENROUTER_API_KEY;
            
            try {
                // Set API key palsu untuk memicu error
                process.env.OPENROUTER_API_KEY = 'invalid_key';
                
                await expect(generateResponse('Test prompt'))
                    .rejects
                    .toThrow();
                
            } finally {
                // Kembalikan API key asli
                process.env.OPENROUTER_API_KEY = originalApiKey;
            }
        });
    });
}); 