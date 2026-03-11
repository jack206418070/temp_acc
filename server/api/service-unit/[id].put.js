import { authenticate } from '~/server/utils/auth';
import { updateServiceUnit } from '~/server/models/serviceUnitModel';
import { createError, readMultipartFormData } from 'h3';
import { validateFileUpload } from '~/server/utils/fileValidation';

export default defineEventHandler(async (event) => {
  try {
    await authenticate(event);

    const id = parseInt(event.context.params.id);
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少 ID'
      });
    }

    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: 'No form data' });

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

    if (!name || !category || !region || !serviceArea || !address || !phone || !email || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    const IMAGE_OPTS = { allowedTypes: ['image/jpeg', 'image/png', 'image/gif'], maxSizeMB: 5 };

    // 單位圖片
    let unitImageBuffer = null;
    if (unitImageFile?.data) {
      const validation = validateFileUpload(unitImageFile.data, unitImageFile.type, IMAGE_OPTS);
      if (!validation.valid) {
        throw createError({ statusCode: 400, statusMessage: `單位圖片：${validation.error}` });
      }
      const size = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`📷 單位圖片: ${size} KB, 類型: ${unitImageFile.type}`);
      unitImageBuffer = unitImageFile.data;
    }

    // 價格圖片
    let priceImageBuffer = null;
    if (priceImageFile?.data) {
      const validation = validateFileUpload(priceImageFile.data, priceImageFile.type, IMAGE_OPTS);
      if (!validation.valid) {
        throw createError({ statusCode: 400, statusMessage: `價格圖片：${validation.error}` });
      }
      const size = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`📷 價格圖片: ${size} KB, 類型: ${priceImageFile.type}`);
      priceImageBuffer = priceImageFile.data;
    }

    const data = await updateServiceUnit(id, {
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
    console.error('❌ Update Service Unit Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新服務單位失敗'
    });
  }
});