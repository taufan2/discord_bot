import { generateResponse, IMessage } from '../services/qroqService';
import { SYSTEM_PROMPT } from '../config/environment';

describe('qroqService', () => {
    beforeAll(() => {
        if (!SYSTEM_PROMPT) {
            console.warn('SYSTEM_PROMPT tidak diatur. Tes mungkin gagal.');
        }
    });

    describe('generateResponse', () => {
        it('should generate a response with string input', async () => {
            const prompt = 'Halo, bisakah kamu memberikan fakta menarik tentang luar angkasa?';

            try {
                const result = await generateResponse(prompt);

                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);

                console.log('Respons dari GROQ AI (string input): \n', result);
            } catch (error) {
                console.error('Error saat menguji GROQ API:', error);
                throw error;
            }
        }, 30000);

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

                console.log('Respons dari GROQ AI (message array input): \n', result);
            } catch (error) {
                console.error('Error saat menguji GROQ API:', error);
                throw error;
            }
        }, 30000);
    });
});

