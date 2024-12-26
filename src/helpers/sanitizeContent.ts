function sanitizeContent(content: string): string {
    return content.replace(/<@!?[\d]+>/g, '').trim();
}

export { sanitizeContent };
