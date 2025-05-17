import { authenticate } from '~/server/utils/auth';
import { createBanner } from '~/server/models/bannerModel';
import { createError } from 'h3';
import { createCanvas, loadImage } from 'canvas';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error('No form data');

    // 獲取表單數據
    const title = formData.find(f => f.name === 'title')?.data.toString();
    const description = formData.find(f => f.name === 'description')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');
    const sortOrder = formData.find(f => f.name === 'sortOrder')?.data.toString();
    const isActive = formData.find(f => f.name === 'is_active')?.data.toString() == 1;

    // 驗證必填欄位
    if (!title || !imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 處理圖片
    let imageBuffer;
    if (imageFile) {
      const originalSize = (imageFile.data.length / 1024).toFixed(2);
      console.log(`原始圖片大小: ${originalSize} KB`);

      try {
        const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString('base64')}`;
        const img = await loadImage(base64Image);
        
        const maxWidth = 1920;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        imageBuffer = canvas.toBuffer('image/jpeg', {
          quality: 0.8,
          progressive: true
        });

        const compressedSize = (imageBuffer.length / 1024).toFixed(2);
        console.log(`壓縮後圖片大小: ${compressedSize} KB`);
        console.log(`圖片壓縮率: ${((1 - imageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error('圖片壓縮失敗:', error);
        throw createError({
          statusCode: 400,
          statusMessage: '圖片處理失敗'
        });
      }
    }

    // 保存到數據庫
    const data = await createBanner({
      title,
      description,
      imageData: imageBuffer,
      imageType: 'image/jpeg',
      sortOrder: parseInt(sortOrder) || 0,
      isActive
    });

    return { 
      success: true, 
      data
    };
  } catch (error) {
    console.error('❌ Create Banner Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建 Banner 失敗'
    });
  }
}); 