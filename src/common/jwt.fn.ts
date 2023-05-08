import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_EXPIRES = "30m";

export const createAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES, //토큰 유지 기간
  });
};

export const getTokenInfo = (user: any) => {
  const accessToken = createAccessToken(user);
  return { accessToken: accessToken, ...user };
};
