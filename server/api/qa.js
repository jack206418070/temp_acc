import qaController from '../controllers/qaController.js';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    return qaController.getAllQA(event);
  }
});