import qaController from '../../controllers/qaController.js';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    return qaController.getQAById(event);
  } else if (event.node.req.method === 'PUT') {
    return qaController.updateQA(event);
  } else if (event.node.req.method === 'DELETE') {
    return qaController.deleteQA(event);
  }
});