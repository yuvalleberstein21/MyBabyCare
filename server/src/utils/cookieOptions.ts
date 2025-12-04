import { Response } from 'express';
const cookieOptions = {
  accessToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    maxAge: 15 * 60 * 1000,
  },
  refreshToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie('accessToken', accessToken, cookieOptions.accessToken);
  res.cookie('refreshToken', refreshToken, cookieOptions.refreshToken);
};

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie('accessToken', accessToken, cookieOptions.accessToken);
};
