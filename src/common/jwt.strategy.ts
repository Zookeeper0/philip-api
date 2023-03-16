const jwt = require("jsonwebtoken");

// JWT 토큰 생성
export function createToken(payload) {
  // const jwtOption = { expiresIn: "12h" };
  const jwtOption = {};

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}

export function createRefreshToken(payload) {
  const jwtOption = { expiresIn: "8h" };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}

// JWT 토큰 검증
export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    // token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}
