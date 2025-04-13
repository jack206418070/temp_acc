import { authenticate } from '~/server/utils/auth';
import { saveAnnouncementImage } from '~/server/models/announcementModel';
import { createError } from 'h3';
import { createCanvas, loadImage } from 'canvas';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);
    
    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    
    // 檢查是否收到表單資料
    if (!formData || !Array.isArray(formData) || formData.length === 0) {
      console.error('未收到表單資料或格式錯誤');
      throw createError({
        statusCode: 400,
        message: '未收到表單資料或格式錯誤'
      });
    }

    // 記錄收到的欄位
    console.log('收到的所有欄位:', formData.map(field => ({
      name: field.name,
      type: field.type,
      filename: field.filename,
      size: field.data?.length || 0,
      hasData: !!field.data
    })));

    // 獲取表單數據
    const announcementIdField = formData.find(f => f.name === 'announcement_id');
    const imageIdField = formData.find(f => f.name === 'image_id');
    const imageField = formData.find(f => f.name === 'image');

    // 檢查每個必填欄位
    const missingFields = [];
    if (!announcementIdField?.data) missingFields.push('announcement_id');
    if (!imageIdField?.data) missingFields.push('image_id');
    if (!imageField?.data) missingFields.push('image');

    // 詳細記錄欄位狀態
    console.log('欄位狀態:', {
      announcement_id: {
        exists: !!announcementIdField,
        hasData: !!announcementIdField?.data,
        value: announcementIdField?.data?.toString()
      },
      image_id: {
        exists: !!imageIdField,
        hasData: !!imageIdField?.data,
        value: imageIdField?.data?.toString()
      },
      image: {
        exists: !!imageField,
        hasData: !!imageField?.data,
        type: imageField?.type,
        filename: imageField?.filename,
        size: imageField?.data?.length || 0
      }
    });

    if (missingFields.length > 0) {
      console.error('缺少必要欄位:', missingFields);
      throw createError({
        statusCode: 400,
        message: `缺少必要欄位: ${missingFields.join(', ')}`
      });
    }

    const announcement_id = announcementIdField.data.toString();
    const image_id = imageIdField.data.toString();

    // 處理圖片
    let imageBuffer;
    if (imageField && imageField.data) {
      const originalSize = (imageField.data.length / 1024).toFixed(2);
      console.log(`原始圖片大小: ${originalSize} KB`);
      console.log('圖片類型:', imageField.type);

      try {
        // 確保圖片類型正確
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(imageField.type)) {
          throw new Error('不支援的圖片格式');
        }

        const base64Image = `data:${imageField.type};base64,${imageField.data.toString('base64')}`;
        const img = await loadImage(base64Image);
        
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');

        // 如果是 PNG，保留透明度
        if (imageField.type === 'image/png') {
          ctx.clearRect(0, 0, targetWidth, targetHeight);
        }
        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        // 根據原始圖片類型選擇輸出格式
        const outputFormat = imageField.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const quality = outputFormat === 'image/jpeg' ? 0.8 : 1;
        
        imageBuffer = canvas.toBuffer(outputFormat, {
          quality,
          progressive: outputFormat === 'image/jpeg'
        });

        const compressedSize = (imageBuffer.length / 1024).toFixed(2);
        console.log(`處理後圖片大小: ${compressedSize} KB`);
        console.log(`圖片處理率: ${((1 - imageBuffer.length / imageField.data.length) * 100).toFixed(2)}%`);
        console.log('輸出格式:', outputFormat);
      } catch (error) {
        console.error('圖片處理失敗:', error);
        throw createError({
          statusCode: 400,
          message: error.message || '圖片處理失敗'
        });
      }
    }

    // 保存到數據庫
    await saveAnnouncementImage(
      parseInt(announcement_id),
      image_id,
      imageBuffer
    );

    return { 
      success: true,
      data: {
        announcement_id,
        image_id
      }
    };
  } catch (error) {
    console.error('❌ Save Announcement Image Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '保存公告圖片失敗'
    });
  }
}); 