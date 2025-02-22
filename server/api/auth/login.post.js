import { createError } from 'h3';
import { validateUser } from '~/server/models/userModel';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;

    console.log('接收到登入請求:', { username });

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: '用戶名和密碼不能為空'
      });
    }

    const user = await validateUser(username, password);
    console.log('用戶驗證結果:', user);
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: '用戶名或密碼錯誤'
      });
    }

    // 生成 JWT token
    const config = useRuntimeConfig();
    const token = jwt.sign(
      { 
        userId: user.uid, // 注意這裡使用 uid 而不是 id
        username: user.username,
        role: user.role 
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    // 設置 cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24, // 24小時
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    console.log('登入成功，返回響應');

    return {
      success: true,
      user: {
        id: user.uid,
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    console.error('登入處理錯誤:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '服務器錯誤'
    });
  }
}); 