import { createError } from 'h3';
import { getAllKnowledge } from '~/server/models/knowledgeModel';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const includeImage = query.includeImage === 'true';

    // category 為選填；若有提供，必須是合法正整數(含 INT 溢位防護)
    let categoryId = null;
    const rawCategory = query.category;
    if (rawCategory !== undefined && String(rawCategory).trim() !== '') {
      categoryId = parsePositiveInt(rawCategory); // server/utils/validate.js 由 Nitro 自動匯入
      if (categoryId === null) {
        throw createError({ statusCode: 400, statusMessage: '參數格式不正確' });
      }
    }

    const data = await getAllKnowledge(categoryId, includeImage);
    return { success: true, data };
  } catch (error) {
    // 已是預期的 4xx（如 400）直接往外丟，不要覆寫成 500
    if (error?.statusCode && error.statusCode < 500) throw error;
    console.error('Get Knowledge List Error:', error);
    throw createError({ statusCode: 500, statusMessage: '獲取知識列表失敗' });
  }
});
