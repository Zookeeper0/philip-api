import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { getTokenFromKakao, getUserFromKakao } from "src/common/kakaoOptions";
import { kakaoUser } from "src/models";
import { UserRepository } from "./user.repository";
import { v1 as uuid } from "uuid";
import { getTokenInfo } from "src/common/jwt.fn";
import { Logger } from "@nestjs/common/services";

@Injectable()
export class UserService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly userRepository: UserRepository
  ) {}

  // 유저 로그인
  async kakaoLogin(authCode: string) {
    const t = await this.seqeulize.transaction();
    try {
      const tokenResponse = await getTokenFromKakao(authCode);
      const userInfo = await getUserFromKakao(tokenResponse);

      console.log("userInfo", userInfo);
      const {
        id: kakaoId,
        kakao_account: { name, phone_number },
      } = userInfo;

      // ( 서비스 회원 여부 확인 ) DB에 존재하는 유저인지 확인
      const user = await this.userRepository.findById(kakaoId);

      /** DB에 존재 하지않는다면 회원 생성 및 가입 */
      if (user.length === 0) {
        const oid = uuid();
        const data = {
          oid: oid,
          accessToken: tokenResponse.access_token,
          kakaoId: kakaoId,
          name: name,
          phoneNumber: phone_number,
          role: "COMMON",
        };
        await kakaoUser.create(data);
      }

      await t.commit();
      const accessToken = await getTokenInfo({ kakaoId });
      return accessToken;
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async changeUserRole(data) {
    const t = await this.seqeulize.transaction();
    try {
      await kakaoUser.update(
        {
          role: data.role,
        },
        {
          where: { oid: data.oid },
          transaction: t,
        }
      );
      await t.commit();
      return;
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
