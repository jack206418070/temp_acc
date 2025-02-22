import { createError } from 'h3';
import jwt from 'jsonwebtoken';

export async function authenticate(event) {
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