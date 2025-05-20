import { g as readBody, c as defineEventHandler } from '../../_/nitro.mjs';
import { i as deleteQA, j as updateQA, k as createQA, l as getQAById, m as getAllQA } from '../../_/qaModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'xss';
import '../../_/db.mjs';
import 'mssql';

const qaController = {
  async getAllQA(event) {
    console.log("\u2705 in getAllQA");
    try {
      const qas = await getAllQA();
      return { data: qas };
    } catch (error) {
      console.error("\u274C Error in getAllQA:", error);
      return { error: "Database query failed" };
    }
  },
  async getQAById(event) {
    try {
      const id = event.context.params.id;
      const qa = await getQAById(id);
      if (!qa) {
        return { message: "\u627E\u4E0D\u5230\u8A72 QA" };
      }
      return { data: qa };
    } catch (error) {
      console.error("\u274C Error in getQAById:", error);
      return { error: error.message };
    }
  },
  async createQA(event) {
    try {
      const body = await readBody(event);
      const { question, answer, category } = body;
      if (!question || !answer || !category) {
        return { message: "\u6240\u6709\u6B04\u4F4D\u90FD\u662F\u5FC5\u586B\u7684" };
      }
      const newQA = await createQA(question, answer, category);
      return { data: newQA };
    } catch (error) {
      console.error("\u274C Error in createQA:", error);
      return { error: error.message };
    }
  },
  async updateQA(event) {
    try {
      const id = event.context.params.id;
      const body = await readBody(event);
      const { question, answer, category } = body;
      if (!question || !answer || !category) {
        return { message: "\u6240\u6709\u6B04\u4F4D\u90FD\u662F\u5FC5\u586B\u7684" };
      }
      const updatedQA = await updateQA(id, question, answer, category);
      return { data: updatedQA };
    } catch (error) {
      console.error("\u274C Error in updateQA:", error);
      return { error: error.message };
    }
  },
  async deleteQA(event) {
    try {
      const id = event.context.params.id;
      await deleteQA(id);
      return { message: "\u522A\u9664\u6210\u529F" };
    } catch (error) {
      console.error("\u274C Error in deleteQA:", error);
      return { error: error.message };
    }
  }
};

const qa = defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    return qaController.getAllQA(event);
  }
});

export { qa as default };
//# sourceMappingURL=qa.mjs.map
