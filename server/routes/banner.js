import {
  handleGetAllBanners,
  handleGetBannerById,
  handleCreateBanner,
  handleUpdateBanner,
  handleDeleteBanner,
  handleUpdateBannerOrder
} from '../controllers/bannerController';

export default defineEventHandler(async (event) => {
  const method = event.method;
  const path = event.path;

  // GET /api/banners - 獲取所有 Banner
  if (method === 'GET' && path === '/api/banners') {
    return await handleGetAllBanners(event);
  }

  // GET /api/banners/:id - 獲取單一 Banner
  if (method === 'GET' && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleGetBannerById(event);
  }

  // POST /api/banners - 新增 Banner
  if (method === 'POST' && path === '/api/banners') {
    return await handleCreateBanner(event);
  }

  // PUT /api/banners/:id - 更新 Banner
  if (method === 'PUT' && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleUpdateBanner(event);
  }

  // DELETE /api/banners/:id - 刪除 Banner
  if (method === 'DELETE' && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleDeleteBanner(event);
  }

  // PUT /api/banners/order - 更新 Banner 排序
  if (method === 'PUT' && path === '/api/banners/order') {
    return await handleUpdateBannerOrder(event);
  }

  throw createError({
    statusCode: 404,
    message: '找不到該路由'
  });
}); 