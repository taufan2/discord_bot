import generateImage from "../services/togetherService.imageGen";

describe('Together Service Image Generation', () => {
    it('should generate an image', async () => {
        const image = await generateImage('Snowy mountain landscape with a river and a waterfall');
        console.log("url", image.data[0].url);
        expect(image).toBeDefined();
    });
});
    