import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { Sequelize } from "sequelize-typescript";
import { post } from "src/models";
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
  async addPost(data: CreatePostDto, files: any) {
    const t = await this.seqeulize.transaction();
    try {
      console.log("addPost data :", data);
      console.log("addPost files :", files);
      const myInfo: any = await verifyToken(data.token);

      console.log("adminOid :", myInfo.oid);
      data.adminOid = myInfo.oid;
      /** oid 생성 */
      // const USER_OID = await this.util.getOid(post, "post");
      const oid = uuid();
      data.oid = oid;

      Logger.log("oid, data", oid, data);
      await post.create(data, { transaction: t });
      await t.commit();
      return { message: "success!!" };
    } catch (err) {
      await t.rollback();
      Logger.error(err);
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
}
