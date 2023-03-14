import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";
import { Utils } from "src/util/common.utils";
import { Logger } from "@nestjs/common/services";
import { post } from "src/models";

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

  async getAllPosts(category) {
    try {
      if (category === ALL_OID) {
        console.log("in");
        return await post.findAll();
      } else {
        return await post.findAll({
          where: {
            categoryOid: category,
          },
        });
      }
    } catch (err) {
      console.log(err);
      Logger.error(err);
    }
  }
}
