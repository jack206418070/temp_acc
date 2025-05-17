import { authenticate } from '~/server/utils/auth';
import { createServiceUnit } from '~/server/models/serviceUnitModel';
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
    const name = formData.find(f => f.name === 'name')?.data.toString();
    const unitImageFile = formData.find(f => f.name === 'unitImage');
    const category = formData.find(f => f.name === 'category')?.data.toString();
    const region = formData.find(f => f.name === 'region')?.data.toString();
    const serviceArea = formData.find(f => f.name === 'serviceArea')?.data.toString();
    const address = formData.find(f => f.name === 'address')?.data.toString();
    const phone = formData.find(f => f.name === 'phone')?.data.toString();
    const email = formData.find(f => f.name === 'email')?.data.toString();
    const description = formData.find(f => f.name === 'description')?.data.toString();
    const website = formData.find(f => f.name === 'website')?.data.toString();
    const priceImageFile = formData.find(f => f.name === 'priceImage');

    // 驗證必填欄位
    if (!name || !category || !region || !serviceArea || !address || !phone || !email || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 處理單位圖片
    let unitImageBuffer;
    if (unitImageFile) {
      const originalUnitSize = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`原始單位圖片大小: ${originalUnitSize} KB`);

      try {
        const base64UnitImage = `data:${unitImageFile.type};base64,${unitImageFile.data.toString('base64')}`;
        const img = await loadImage(base64UnitImage);
        
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        unitImageBuffer = canvas.toBuffer('image/jpeg', {
          quality: 0.8,
          progressive: true
        });

        const compressedUnitSize = (unitImageBuffer.length / 1024).toFixed(2);
        console.log(`壓縮後單位圖片大小: ${compressedUnitSize} KB`);
        console.log(`單位圖片壓縮率: ${((1 - unitImageBuffer.length / unitImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error('單位圖片壓縮失敗:', error);
        throw createError({
          statusCode: 400,
          statusMessage: '單位圖片處理失敗'
        });
      }
    }

    // 處理價格圖片
    let priceImageBuffer;
    if (priceImageFile) {
      const originalPriceSize = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`原始價格圖片大小: ${originalPriceSize} KB`);

      try {
        const base64PriceImage = `data:${priceImageFile.type};base64,${priceImageFile.data.toString('base64')}`;
        const img = await loadImage(base64PriceImage);
        
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        priceImageBuffer = canvas.toBuffer('image/jpeg', {
          quality: 0.8,
          progressive: true
        });

        const compressedPriceSize = (priceImageBuffer.length / 1024).toFixed(2);
        console.log(`壓縮後價格圖片大小: ${compressedPriceSize} KB`);
        console.log(`價格圖片壓縮率: ${((1 - priceImageBuffer.length / priceImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error('價格圖片壓縮失敗:', error);
        throw createError({
          statusCode: 400,
          statusMessage: '價格圖片處理失敗'
        });
      }
    }

    // 保存到數據庫
    const data = await createServiceUnit({
      name,
      unitImage: unitImageBuffer,
      category,
      region,
      serviceArea,
      address,
      phone,
      email,
      description,
      website,
      priceImage: priceImageBuffer
    });

    return { 
      success: true, 
      data
    };
  } catch (error) {
    console.error('❌ Create Service Unit Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建服務單位失敗'
    });
  }
}); 