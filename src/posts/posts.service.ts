import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { Sequelize } from "sequelize-typescript";
import { post } from "src/models";
import { files } from "src/models";
import { Utils } from "src/util/common.utils";
import { CreatePostDto } from "./dto/create-post.dto";
import { v1 as uuid } from "uuid";
import { verifyToken } from "src/common/jwt.strategy";

@Injectable()
export class PostsService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly util: Utils
  ) {}

  // dto : oid?, title, adress, phoneNumber
  async addPost(data: CreatePostDto, filesData: Array<Express.Multer.File>) {
    const t = await this.seqeulize.transaction();
    try {
      const filesResult = [];
      const postOid = uuid();

      const myInfo: any = await verifyToken(data.token);
      data.oid = postOid;
      data.adminOid = myInfo.oid;

      await post.create(data, { transaction: t });
      // /** oid 생성 */
      // const USER_OID = await this.util.getOid(post, "post");

      // 이미지 처리 로직
      if (filesData) {
        filesData.forEach((file) => {
          const oid = uuid();
          const res = {
            oid: oid,
            postOid: postOid,
            ...file,
          };
          filesResult.push(res);
        });

        console.log("result :", filesResult);

        const Data = await Promise.all(
          filesResult.map((file) => files.create(file, { transaction: t }))
        );
      }

      await t.commit();
      return { message: "success!!" };
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  /** 카테고리 선택에 따른 메인 메뉴리스트  */
  async getCategoryPosts(oid: string) {
    const t = await this.seqeulize.transaction();
    try {
      /** data */
      const postsData = await post.findAll({
        where: {
          categoryOid: oid,
        },
      });
      await t.commit();
      return postsData;
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async countViews(countOid: string) {
    const t = await this.seqeulize.transaction();
    try {
      /** data */
      await post.increment({ views: 1 }, { where: { oid: countOid } });
      await t.commit();
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
