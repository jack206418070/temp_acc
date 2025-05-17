import { getAllQA, getQAById, createQA, updateQA, deleteQA } from '../models/qaModel.js';

export default {
  async getAllQA(event) {
    console.log('✅ in getAllQA');
    try {
      const qas = await getAllQA();
      return { data: qas };
    } catch (error) {
      console.error('❌ Error in getAllQA:', error);
      return { error: 'Database query failed' };
    }
  },

  async getQAById(event) {
    try {
      const id = event.context.params.id; // 在 Nuxt 3 (H3) 內讀取 `id`
      const qa = await getQAById(id);
      if (!qa) {
        return { message: '找不到該 QA' };
      }
      return { data: qa };
    } catch (error) {
      console.error('❌ Error in getQAById:', error);
      return { error: error.message };
    }
  },

  async createQA(event) {
    try {
      const body = await readBody(event); // 在 H3 內讀取 `body`
      const { question, answer, category } = body;
      if (!question || !answer || !category) {
        return { message: '所有欄位都是必填的' };
      }
      const newQA = await createQA(question, answer, category);
      return { data: newQA };
    } catch (error) {
      console.error('❌ Error in createQA:', error);
      return { error: error.message };
    }
  },

  async updateQA(event) {
    try {
      const id = event.context.params.id;
      const body = await readBody(event);
      const { question, answer, category } = body;
      if (!question || !answer || !category) {
        return { message: '所有欄位都是必填的' };
      }
      const updatedQA = await updateQA(id, question, answer, category);
      return { data: updatedQA };
    } catch (error) {
      console.error('❌ Error in updateQA:', error);
      return { error: error.message };
    }
  },

  async deleteQA(event) {
    try {
      const id = event.context.params.id;
      await deleteQA(id);
      return { message: '刪除成功' };
    } catch (error) {
      console.error('❌ Error in deleteQA:', error);
      return { error: error.message };
    }
  }
};