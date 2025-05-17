import { createError } from 'h3';
import jwt from 'jsonwebtoken';
import { useRuntimeConfig } from '#imports';

export async function authenticate(event) {
  console.log(event);
  const token = getHeader(event, 'Authorization')?.split(' ')[1];
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: '未提供認證令牌'
    });
  }

  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: '無效的認證令牌'
    });
  }
} 

export const verifyToken = async (token) => {
  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    console.error('Token 驗證失敗:', error);
    return null;
  }
};

// 生成 Token
export const generateToken = (payload) => {
  try {
    const config = useRuntimeConfig();
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
  } catch (error) {
    console.error('Token 生成失敗:', error);
    return null;
  }
}; 