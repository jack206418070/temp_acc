import { createError, readBody, defineEventHandler } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { loadImage, createCanvas } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/canvas/index.js';
import { g as getAllBanners, b as getBannerById, c as createBanner, u as updateBanner, d as deleteBanner, a as updateBannerOrder } from '../_/bannerModel.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/mssql/index.js';
import '../_/db.mjs';

async function handleGetAllBanners(event) {
  try {
    const banners = await getAllBanners();
    return banners;
  } catch (error) {
    console.error("\u274C handleGetAllBanners Error:", error);
    throw createError({
      statusCode: 500,
      message: "\u7372\u53D6 Banner \u5217\u8868\u5931\u6557"
    });
  }
}
async function handleGetBannerById(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const banner = await getBannerById(id);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return banner;
  } catch (error) {
    console.error("\u274C handleGetBannerById Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u7372\u53D6 Banner \u8A73\u60C5\u5931\u6557"
    });
  }
}
async function handleCreateBanner(event) {
  try {
    const body = await readBody(event);
    if (!body.title || !body.image_data) {
      throw createError({
        statusCode: 400,
        message: "\u6A19\u984C\u548C\u5716\u7247\u70BA\u5FC5\u586B\u6B04\u4F4D"
      });
    }
    try {
      const base64Image = body.image_data;
      const img = await loadImage(base64Image);
      const maxWidth = 1920;
      const scale = maxWidth / img.width;
      const targetWidth = img.width > maxWidth ? maxWidth : img.width;
      const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
      const canvas = createCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imageBuffer = canvas.toBuffer("image/jpeg", {
        quality: 0.8,
        progressive: true
      });
      const banner = await createBanner({
        ...body,
        image_data: imageBuffer,
        image_type: "image/jpeg"
      });
      return banner;
    } catch (error) {
      console.error("\u5716\u7247\u8655\u7406\u5931\u6557:", error);
      throw createError({
        statusCode: 400,
        message: "\u5716\u7247\u8655\u7406\u5931\u6557"
      });
    }
  } catch (error) {
    console.error("\u274C handleCreateBanner Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u65B0\u589E Banner \u5931\u6557"
    });
  }
}
async function handleUpdateBanner(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const body = await readBody(event);
    if (body.image_data) {
      try {
        const base64Image = body.image_data;
        const img = await loadImage(base64Image);
        const maxWidth = 1920;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const imageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        body.image_data = imageBuffer;
        body.image_type = "image/jpeg";
      } catch (error) {
        console.error("\u5716\u7247\u8655\u7406\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          message: "\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    const banner = await updateBanner(id, body);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return banner;
  } catch (error) {
    console.error("\u274C handleUpdateBanner Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u66F4\u65B0 Banner \u5931\u6557"
    });
  }
}
async function handleDeleteBanner(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const banner = await deleteBanner(id);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return { message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C handleDeleteBanner Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u522A\u9664 Banner \u5931\u6557"
    });
  }
}
async function handleUpdateBannerOrder(event) {
  try {
    const body = await readBody(event);
    const { id, sort_order } = body;
    if (isNaN(id) || isNaN(sort_order)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684\u53C3\u6578"
      });
    }
    const banner = await updateBannerOrder(id, sort_order);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return banner;
  } catch (error) {
    console.error("\u274C handleUpdateBannerOrder Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u66F4\u65B0 Banner \u6392\u5E8F\u5931\u6557"
    });
  }
}

const banner = defineEventHandler(async (event) => {
  const method = event.method;
  const path = event.path;
  if (method === "GET" && path === "/api/banners") {
    return await handleGetAllBanners();
  }
  if (method === "GET" && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleGetBannerById(event);
  }
  if (method === "POST" && path === "/api/banners") {
    return await handleCreateBanner(event);
  }
  if (method === "PUT" && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleUpdateBanner(event);
  }
  if (method === "DELETE" && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleDeleteBanner(event);
  }
  if (method === "PUT" && path === "/api/banners/order") {
    return await handleUpdateBannerOrder(event);
  }
  throw createError({
    statusCode: 404,
    message: "\u627E\u4E0D\u5230\u8A72\u8DEF\u7531"
  });
});

export { banner as default };
//# sourceMappingURL=banner.mjs.map
