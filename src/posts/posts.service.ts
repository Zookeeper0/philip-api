import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { Sequelize } from "sequelize-typescript";
import { category, post } from "src/models";
import { files } from "src/models";
import { Utils } from "src/util/common.utils";
import { CreatePostDto } from "./dto/create-post.dto";
import { v1 as uuid } from "uuid";
import { existsSync, unlinkSync } from "fs";
@Injectable()
export class PostsService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly util: Utils
  ) {}

  // dto : oid?, storeName, adress, phoneNumber
  async addPost(data: CreatePostDto, filesData: any, user: any) {
    const t = await this.seqeulize.transaction();
    try {
      const filesResult = [];
      const postOid = uuid();

      data.oid = postOid;
      data.adminOid = user.oid;

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

  async deletePost(oid: string) {
    const t = await this.seqeulize.transaction();
    try {
      /** data */
      await post.destroy({ where: { oid: oid } });
      await t.commit();
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  /** 디테일 페이지 들어갈때 방문자수 카운트 */
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

  /** 업체관리 데이터 수정, 이미지 수정  */
  async editPost(data: any) {
    const t = await this.seqeulize.transaction();
    try {
      const filesResult = [];
      await post.update(
        {
          cityOid: data.content.cityOid,
          categoryOid: data.content.categoryOid,
          storeName: data.content.storeName,
          ownerName: data.content.ownerName,
          address: data.content.address,
          phoneNumber: data.content.phoneNumber,
          contents: data.content.contents,
          remark: data.content.remark,
        },
        {
          where: { oid: data.content.oid },
          transaction: t,
        }
      );

      // 이미지 처리 로직
      if (data.files) {
        data.files.forEach((file) => {
          const oid = uuid();
          const res = {
            oid: oid,
            postOid: data.content.oid,
            ...file,
          };
          filesResult.push(res);
        });

        await Promise.all(
          filesResult.map((file) => files.create(file, { transaction: t }))
        );
      }

      await t.commit();
      return { message: "success!!" };
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  /** 이미지 등록 preview 이미지 삭제  */
  async deletePreviewImages(fileName: string) {
    if (existsSync("uploads/" + fileName)) {
      // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
      try {
        unlinkSync("uploads/" + fileName);
      } catch (error) {
        console.log(error);
      }
    }
  }

  /** 업체 수정시 이미지 삭제 */
  async deleteImage(oid: string) {
    Logger.log(oid);
    const t = await this.seqeulize.transaction();
    try {
      await files.destroy({ where: { oid: oid } });
      await t.commit();
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getOnePost(oid) {
    const t = await this.seqeulize.transaction();
    try {
      const data = await post.findOne({
        attributes: [
          "oid",
          "cityOid",
          "categoryOid",
          "storeName",
          "ownerName",
          "address",
          "phoneNumber",
          "contents",
          "remark",
          "views",
        ],
        where: {
          oid: oid,
        },
        include: [
          {
            model: files,
            as: "thumb",
            where: { postOid: oid, label: "thumb" },
            attributes: ["filename", "oid"],
            required: false,
          },
          {
            model: files,
            as: "detail",
            where: { postOid: oid, label: "detail" },
            attributes: ["filename", "oid"],
            required: false,
          },
          {
            model: files,
            as: "menu",
            where: { postOid: oid, label: "menu" },
            attributes: ["filename", "oid"],
            required: false,
          },
          {
            model: category,
            attributes: ["name"],
            required: false,
          },
        ],
      });
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  async getEditPostInfo(oid) {
    const t = await this.seqeulize.transaction();
    try {
      const data = await post.findOne({
        where: {
          oid: oid,
        },
        include: [
          {
            model: files,
            as: "thumb",
            where: { postOid: oid, label: "thumb" },
            attributes: ["filename"],
          },
          {
            model: files,
            as: "detail",
            where: { postOid: oid, label: "detail" },
            attributes: ["filename"],
          },
          {
            model: files,
            as: "menu",
            where: { postOid: oid, label: "menu" },
            attributes: ["filename"],
          },
        ],
      });
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
