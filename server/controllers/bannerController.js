import { createError } from 'h3';
import { createCanvas, loadImage } from 'canvas';
import {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  updateBannerOrder
} from '../models/bannerModel';

// 獲取所有 Banner
export async function handleGetAllBanners(event) {
  try {
    const banners = await getAllBanners();
    return banners;
  } catch (error) {
    console.error('❌ handleGetAllBanners Error:', error);
    throw createError({
      statusCode: 500,
      message: '獲取 Banner 列表失敗'
    });
  }
}

// 獲取單一 Banner
export async function handleGetBannerById(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: '無效的 Banner ID'
      });
    }

    const banner = await getBannerById(id);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: '找不到指定的 Banner'
      });
    }

    return banner;
  } catch (error) {
    console.error('❌ handleGetBannerById Error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: '獲取 Banner 詳情失敗'
    });
  }
}

// 新增 Banner
export async function handleCreateBanner(event) {
  try {
    const body = await readBody(event);
    
    // 驗證必要欄位
    if (!body.title || !body.image_data) {
      throw createError({
        statusCode: 400,
        message: '標題和圖片為必填欄位'
      });
    }

    // 處理圖片
    try {
      const base64Image = body.image_data;
      const img = await loadImage(base64Image);
      
      const maxWidth = 1920;
      const scale = maxWidth / img.width;
      const targetWidth = img.width > maxWidth ? maxWidth : img.width;
      const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
      
      const canvas = createCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      const imageBuffer = canvas.toBuffer('image/jpeg', {
        quality: 0.8,
        progressive: true
      });

      const banner = await createBanner({
        ...body,
        image_data: imageBuffer,
        image_type: 'image/jpeg'
      });

      return banner;
    } catch (error) {
      console.error('圖片處理失敗:', error);
      throw createError({
        statusCode: 400,
        message: '圖片處理失敗'
      });
    }
  } catch (error) {
    console.error('❌ handleCreateBanner Error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: '新增 Banner 失敗'
    });
  }
}

// 更新 Banner
export async function handleUpdateBanner(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: '無效的 Banner ID'
      });
    }

    const body = await readBody(event);
    
    // 如果有更新圖片，進行壓縮處理
    if (body.image_data) {
      try {
        const base64Image = body.image_data;
        const img = await loadImage(base64Image);
        
        const maxWidth = 1920;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        const imageBuffer = canvas.toBuffer('image/jpeg', {
          quality: 0.8,
          progressive: true
        });

        body.image_data = imageBuffer;
        body.image_type = 'image/jpeg';
      } catch (error) {
        console.error('圖片處理失敗:', error);
        throw createError({
          statusCode: 400,
          message: '圖片處理失敗'
        });
      }
    }

    const banner = await updateBanner(id, body);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: '找不到指定的 Banner'
      });
    }

    return banner;
  } catch (error) {
    console.error('❌ handleUpdateBanner Error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: '更新 Banner 失敗'
    });
  }
}

// 刪除 Banner
export async function handleDeleteBanner(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: '無效的 Banner ID'
      });
    }

    const banner = await deleteBanner(id);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: '找不到指定的 Banner'
      });
    }

    return { message: '刪除成功' };
  } catch (error) {
    console.error('❌ handleDeleteBanner Error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: '刪除 Banner 失敗'
    });
  }
}

// 更新 Banner 排序
export async function handleUpdateBannerOrder(event) {
  try {
    const body = await readBody(event);
    const { id, sort_order } = body;

    if (isNaN(id) || isNaN(sort_order)) {
      throw createError({
        statusCode: 400,
        message: '無效的參數'
      });
    }

    const banner = await updateBannerOrder(id, sort_order);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: '找不到指定的 Banner'
      });
    }

    return banner;
  } catch (error) {
    console.error('❌ handleUpdateBannerOrder Error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: '更新 Banner 排序失敗'
    });
  }
} 