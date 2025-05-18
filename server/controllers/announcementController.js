import {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  saveAnnouncementImage,
  getAnnouncementImage
} from '../models/announcementModel.js';

export default {
  // 獲取所有公告
  async getAllAnnouncements(event) {
    console.log('✅ in getAllAnnouncements');
    try {
      const announcements = await getAllAnnouncements();
      return { data: announcements };
    } catch (error) {
      console.error('❌ Error in getAllAnnouncements:', error);
      return { error: '資料庫查詢失敗' };
    }
  },

  // 獲取單個公告
  async getAnnouncementById(event) {
    try {
      const id = event.context.params.id;
      const announcement = await getAnnouncementById(id);
      if (!announcement) {
        return { message: '找不到該公告' };
      }
      return { data: announcement };
    } catch (error) {
      console.error('❌ Error in getAnnouncementById:', error);
      return { error: error.message };
    }
  },

  // 創建公告
  async createAnnouncement(event) {
    try {
      const body = await readBody(event);
      const {
        publish_date,
        activity_start_date,
        category,
        content,
        title,
        link,
        image_id,
        image_content
      } = body;

      // 驗證必填欄位
      if (!publish_date || !activity_start_date || !category || !content || !title) {
        return { message: '必填欄位不能為空' };
      }

      // 創建公告
      const newAnnouncement = await createAnnouncement({
        publish_date,
        activity_start_date,
        category,
        content,
        title,
        link,
        image_id
      });

      // 如果有圖片，儲存圖片
      if (image_content && image_id) {
        await saveAnnouncementImage(newAnnouncement.id, image_id, Buffer.from(image_content));
      }

      return { data: newAnnouncement };
    } catch (error) {
      console.error('❌ Error in createAnnouncement:', error);
      return { error: error.message };
    }
  },

  // 更新公告
  async updateAnnouncement(event) {
    try {
      const id = event.context.params.id;
      const body = await readBody(event);
      const {
        publish_date,
        activity_start_date,
        category,
        content,
        title,
        link,
        image_id,
        image_content
      } = body;

      // 驗證必填欄位
      if (!publish_date || !activity_start_date || !category || !content || !title) {
        return { message: '必填欄位不能為空' };
      }

      // 更新公告
      await updateAnnouncement(id, {
        publish_date,
        activity_start_date,
        category,
        content,
        title,
        link,
        image_id
      });

      // 如果有新圖片，更新圖片
      if (image_content && image_id) {
        await saveAnnouncementImage(id, image_id, Buffer.from(image_content));
      }

      return { message: '更新成功' };
    } catch (error) {
      console.error('❌ Error in updateAnnouncement:', error);
      return { error: error.message };
    }
  },

  // 刪除公告
  async deleteAnnouncement(event) {
    try {
      const id = event.context.params.id;
      await deleteAnnouncement(id);
      return { message: '刪除成功' };
    } catch (error) {
      console.error('❌ Error in deleteAnnouncement:', error);
      return { error: error.message };
    }
  },

  // 獲取公告圖片
  async getAnnouncementImage(event) {
    try {
      const image_id = event.context.params.image_id;
      const image = await getAnnouncementImage(image_id);
      if (!image) {
        return { message: '找不到該圖片' };
      }
      return { data: image };
    } catch (error) {
      console.error('❌ Error in getAnnouncementImage:', error);
      return { error: error.message };
    }
  }
}; 