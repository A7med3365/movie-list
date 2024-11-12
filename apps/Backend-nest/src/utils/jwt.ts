import { UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

export function generateJwt(existingUser: TokenPayload): string {
  if (!process.env.VITE_JWT_KEY) {
    throw new Error('JWT key not set');
  }
  return jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
    },
    process.env.VITE_JWT_KEY,
    { expiresIn: '8h' }
  );
}

export function verifyJwt(token: string): TokenPayload {
  if (!process.env.VITE_JWT_KEY) {
    throw new Error('JWT key not set');
  }
  try {
    return jwt.verify(token, process.env.VITE_JWT_KEY) as TokenPayload;
  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }
}
