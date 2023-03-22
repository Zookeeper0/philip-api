import axios from "axios";

export async function getTokenFromKakao(authCode) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${authCode["authCode"]}`;
  console.log("tokenURl", tokenUrl);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios
    .post(tokenUrl, "", config)
    .then((res) => res.data);

  return response;
}

export async function getUserFromKakao({ access_token }) {
  const userInfoUrl = "https://kapi.kakao.com/v2/user/me";
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(userInfoUrl, config).then((res) => res.data);
  return response;
}
