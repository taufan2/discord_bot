import { getChats } from '../services/dbServices';
import mongoose from 'mongoose';

describe('dbServices', () => {
  // Koneksi ke database sebelum semua tes
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/discord_bot');
  });

  // Tutup koneksi database setelah semua tes selesai
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('getChats', () => {
    it('should fetch chats from the database', async () => {
      const result = await getChats({
        channelId: '1321781072849141780',
        userId: '383968696575721473',
        limit: 5
      });

      // Periksa apakah result adalah array
      expect(Array.isArray(result)).toBe(true);

      // Log hasil untuk inspeksi manual
      console.log('Fetched chats:', result);

      // Anda bisa menambahkan lebih banyak assertions di sini
      // tergantung pada struktur data yang Anda harapkan
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('channel');
        expect(result[0]).toHaveProperty('user');
        expect(result[0]).toHaveProperty('content');
      }
    });
  });
});
