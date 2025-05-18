import { authenticate } from '~/server/utils/auth';
import { getAllServiceUnits } from '~/server/models/serviceUnitModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 從 query 中獲取 includePriceImage 參數，預設為 true
    const query = getQuery(event);
    const includePriceImage = query.includePriceImage !== 'false';

    // 獲取所有服務單位
    const data = await getAllServiceUnits(includePriceImage);

    // 如果不包含價格圖片，移除相關欄位
    if (!includePriceImage) {
      data.forEach(unit => {
        delete unit.priceImage;
        delete unit.priceImagePath;
      });
    }

    return { 
      success: true, 
      data
    };
  } catch (error) {
    console.error('❌ Get Service Units Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取服務單位失敗'
    });
  }
}); 