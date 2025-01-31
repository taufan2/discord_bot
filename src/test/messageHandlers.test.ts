import { extractContent } from '../handlers/messageHandlers';

describe('extractContent', () => {
    it('should return original text when input is not JSON', () => {
        const normalText = 'This is a normal text response';
        expect(extractContent(normalText)).toBe(normalText);
    });

    it('should extract content from valid JSON response', () => {
        const jsonResponse = JSON.stringify({
            id: '123',
            timestamp: 1621234567,
            content: 'This is the actual content',
            role: 'assistant'
        });
        expect(extractContent(jsonResponse)).toBe('This is the actual content');
    });

    it('should handle JSON without content field', () => {
        const jsonWithoutContent = JSON.stringify({
            id: '123',
            timestamp: 1621234567,
            role: 'assistant'
        });
        expect(extractContent(jsonWithoutContent)).toBe(jsonWithoutContent);
    });

    it('should handle malformed JSON', () => {
        const malformedJson = '{this is not valid json}';
        expect(extractContent(malformedJson)).toBe(malformedJson);
    });

    it('should handle empty string', () => {
        expect(extractContent('')).toBe('');
    });

    it('should handle whitespace around JSON', () => {
        const jsonWithWhitespace = `
            {
                "content": "This should be extracted",
                "role": "assistant"
            }
        `;
        expect(extractContent(jsonWithWhitespace)).toBe('This should be extracted');
    });

    it('should handle nested JSON in content', () => {
        const nestedJson = JSON.stringify({
            content: JSON.stringify({
                innerContent: 'This should not be extracted further'
            }),
            role: 'assistant'
        });
        expect(extractContent(nestedJson)).toBe(JSON.stringify({
            innerContent: 'This should not be extracted further'
        }));
    });

    it('should handle complex markdown content in JSON', () => {
        const markdownJson = JSON.stringify({
            content: '> *Quote*\n\n**Bold** and `code`\n```\nCode block\n```',
            role: 'assistant'
        });
        expect(extractContent(markdownJson)).toBe('> *Quote*\n\n**Bold** and `code`\n```\nCode block\n```');
    });
}); 