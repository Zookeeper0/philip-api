import { ACCESS_TOKEN_SECRET, DOMAIN, NODE_ENV, REFRESH_TOKEN_SECRET } from '@environments';
import { CookieOptions } from 'express';

export const cookieOpsions: CookieOptions = {
  domain: NODE_ENV === 'production' ? DOMAIN : undefined,
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

export const accessCookieOpsions: CookieOptions = {
  ...cookieOpsions,
  maxAge: 1000 * 60 * 60 * 1, // 1h
};

export const refreshCookieOpsions: CookieOptions = {
  ...cookieOpsions,
  maxAge: 1000 * 60 * 60 * 24 * 8, // 8d
};

export const accessJwtOptions = {
  secret: ACCESS_TOKEN_SECRET,
  expiresIn: '30m',
};
export const refreshJwtOptions = {
  secret: REFRESH_TOKEN_SECRET,
  expiresIn: '7d',
};
