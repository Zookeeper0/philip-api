import { Injectable, BadRequestException } from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { Sequelize } from "sequelize-typescript";
import { post } from "src/models";
import { Utils } from "src/util/common.utils";
import { CreatePostDto } from "./dto/create-post.dto";
import { v1 as uuid } from "uuid";
@Injectable()
export class PostsService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly util: Utils
  ) {}

  // dto : oid?, title, adress, phoneNumber
  async addPost(data: CreatePostDto) {
    const t = await this.seqeulize.transaction();
    try {
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

  // 카테고리에 따른 메뉴
  async getCategoryPosts(oid) {
    const t = await this.seqeulize.transaction();
    try {
      const postsData = await post.findAll({
        where: {
          categoryOid: oid,
        },
      });
      await t.commit();
      return postsData;
    } catch (error) {
      await t.rollback();
      console.log(error);
      Logger.error(error);
    }
  }
}
