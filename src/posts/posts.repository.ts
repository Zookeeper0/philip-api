import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";
import { Utils } from "src/util/common.utils";
import { Logger } from "@nestjs/common/services";
import { post } from "src/models";
import { Op } from "sequelize";

const ALL_OID = "fb673f00-c152-11ed-8fb3-59762efda8c3";

@Injectable()
export class PostsRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly util: Utils
  ) {}

  async getOnePost(oid: string) {
    return await this.sequelize.query(
      `
        SELECT 
          p.oid, 
          p.admin_oid, 
          p.title, 
          p.address,
          p.phone_number,
          p.contents,
          p.views,
          c.name AS category
        FROM
          post AS p 
          INNER JOIN category AS c 
              ON p.category_oid = c.oid 
          WHERE p.oid = '${oid}';
        `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
  }

  async getAllPosts(category, search) {
    try {
      if (category === ALL_OID) {
        console.log("in");
        return await post.findAll({
          attributes: ["title", "oid"],
          where: {
            title: {
              //카테고리가 전체(디폴트값)이고 제목에 검색어가 포함됐나?
              [Op.like]: `%${search}%`,
            },
          },
        });
      } else {
        return await post.findAll({
          attributes: ["title", "oid"],
          where: {
            [Op.and]: [
              {
                title: {
                  // 카테고리가 선택되고 검색어가 있나?
                  [Op.like]: `%${search}%`,
                },
              },
              { categoryOid: category },
            ],
          },
        });
      }
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  async getPromotionPosts(category) {
    console.log("in promotion");
    try {
      if (category === ALL_OID) {
        return await post.findAll({
          attributes: ["title", "oid"],

          where: {
            promotion: true,
          },
        });
      } else {
        return await post.findAll({
          attributes: ["title", "oid"],
          where: {
            [Op.and]: [
              {
                promotion: true,
              },
              { categoryOid: category },
            ],
          },
        });
      }
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }
}
