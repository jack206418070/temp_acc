import qaController from '../../controllers/qaController.js';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    return qaController.createQA(event);
  }
});