import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { getTokenFromKakao, getUserFromKakao } from "src/common/kakaoOptions";
import { kakaoUser } from "src/models";
import { UserRepository } from "./user.repository";
import { v1 as uuid } from "uuid";
import { getTokenInfo } from "src/common/jwt.fn";

@Injectable()
export class UserService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly userRepository: UserRepository
  ) {}

  // 유저 로그인
  async kakaoLogin(authCode: string) {
    const tokenResponse = await getTokenFromKakao(authCode);
    const userInfo = await getUserFromKakao(tokenResponse);

    const { id: kakaoId } = userInfo;

    // DB에 존재하는 유저인지 확인
    const user = await this.userRepository.findById(kakaoId);

    if (user.length === 0) {
      const oid = uuid();
      const data = {
        oid: oid,
        accessToken: tokenResponse.access_token,
        kakaoId: kakaoId,
      };
      await kakaoUser.create(data);
    }
    const data = await getTokenInfo({ kakaoId });
    return data.accessToken;
  }
}
