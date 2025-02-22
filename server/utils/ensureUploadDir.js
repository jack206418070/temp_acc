import { mkdir } from 'fs/promises';
import { join } from 'path';

export async function ensureUploadDir() {
  const uploadDir = join(process.cwd(), 'static', 'uploads');
  try {
    await mkdir(uploadDir, { recursive: true });
    console.log('✅ Upload directory created or already exists:', uploadDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error('❌ Failed to create upload directory:', error);
      throw error;
    }
  }
} 