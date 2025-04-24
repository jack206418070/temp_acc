import { authenticate } from '~/server/utils/auth';
import { createKnowledge } from '~/server/models/knowledgeModel';
import { createError } from 'h3';
import { createCanvas, loadImage } from 'canvas';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error('No form data');

    const know_category = formData.find(f => f.name === 'know_category')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');
    const title = formData.find(f => f.name === 'title')?.data.toString();
    const image_url = formData.find(f => f.name === 'image_url')?.data.toString();
    
    if (!know_category || !imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 計算原始圖片大小（以 KB 為單位）
    const originalSize = (imageFile.data.length / 1024).toFixed(2);
    console.log(`原始圖片大小: ${originalSize} KB`);

    // 使用 canvas 壓縮圖片
    let compressedImageBuffer;
    try {
      // 將 Buffer 轉換為 base64
      const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString('base64')}`;
      
      // 載入圖片
      const img = await loadImage(base64Image);
      
      // 創建 canvas，設定合適的尺寸
      const maxWidth = 1200;
      const scale = maxWidth / img.width;
      const targetWidth = img.width > maxWidth ? maxWidth : img.width;
      const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
      
      const canvas = createCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext('2d');
      
      // 繪製圖片
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // 將 canvas 轉換為 buffer，設定 JPEG 品質為 0.8
      compressedImageBuffer = canvas.toBuffer('image/jpeg', {
        quality: 0.8,
        progressive: true
      });

      // 計算壓縮後的大小（以 KB 為單位）
      const compressedSize = (compressedImageBuffer.length / 1024).toFixed(2);
      console.log(`壓縮後大小: ${compressedSize} KB`);
      console.log(`壓縮率: ${((1 - compressedImageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`);

    } catch (error) {
      console.error('圖片壓縮失敗:', error);
      throw createError({
        statusCode: 400,
        statusMessage: '圖片處理失敗'
      });
    }

    // 保存到數據庫
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: compressedImageBuffer,
      imageType: 'image/jpeg',
      title: title,
      image_url: image_url || null
    });

    return { 
      success: true, 
      data,
      imageInfo: {
        originalSize: `${originalSize} KB`,
        compressedSize: `${(compressedImageBuffer.length / 1024).toFixed(2)} KB`,
        compressionRatio: `${((1 - compressedImageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`
      }
    };
  } catch (error) {
    console.error('❌ Create Knowledge Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建知識失敗'
    });
  }
}); 