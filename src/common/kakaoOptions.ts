import axios from "axios";

/** 인가코드를 통해 카카오서버에서 엑세스토큰, 리프레쉬토큰 ,.. 받아오기 */
export async function getTokenFromKakao(authCode) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${authCode["authCode"]}`;

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

/**  getTokenFromKakao 함수를 통해 받아온 엑세스토큰으로 다시한번 카카오서버에 유저정보 요청*/
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
