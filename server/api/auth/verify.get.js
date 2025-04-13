import jwt from 'jsonwebtoken';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    console.log('verify.get');
    const token = getHeader(event, 'Authorization')?.split(' ')[1];
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: '未提供認證令牌'
      });
    }

    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);

    return {
      valid: true,
      user: {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role
      }
    };
  } catch (error) {
    console.error('Token verification error:', error);
    throw createError({
      statusCode: 401,
      statusMessage: '無效的認證令牌'
    });
  }
}); 