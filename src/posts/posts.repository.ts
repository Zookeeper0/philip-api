import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";
import { Logger } from "@nestjs/common/services";
import { post } from "src/models";
import { Op } from "sequelize";
import { Utils } from "src/util/common.utils";
import { Request } from "express";

const ALL_OID = "fb673f00-c152-11ed-8fb3-59762efda8c3";

@Injectable()
export class PostsRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly util: Utils
  ) {}

  /**  GET 디테일 페이지 정보 요청 */
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

  /** GET 모든 게시물 */
  async getAllPosts(req: Request) {
    try {
      const { city, search, category } = req.query;
      if (category === ALL_OID) {
        const whereArr = [
          ["AND p.title LIKE :search", search],
          ["AND p.city_oid LIKE :city", city],
        ];
        //카테고리가 전체(디폴트값)이고 제목에 검색어가 포함됐나?
        return await this.sequelize.query(
          `
          SELECT 
            p.oid,
            p.category_oid,
            p.admin_oid, 
            p.title, 
            p.views,
            c.name AS category
          FROM
            post AS p 
            INNER JOIN category AS c 
                ON p.category_oid = c.oid 
            WHERE TRUE
            ${this.util.likeGenerator(whereArr, req.query)}
        `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: req.query,
          }
        );
      } else {
        const whereArr = [
          ["AND p.title LIKE :search", search],
          ["AND p.category_oid LIKE :category", category],
          ["AND p.city_oid LIKE :city", city],
        ];
        return await this.sequelize.query(
          `
          SELECT
            p.oid,
            p.category_oid,
            p.admin_oid,
            p.title,
            p.views,
            c.name AS category
          FROM
            post AS p
            INNER JOIN category AS c
                ON p.category_oid = c.oid
            WHERE TRUE
            ${this.util.likeGenerator(whereArr, req.query)}
        `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: req.query,
          }
        );
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  /** GET 모든 프로모션 게시물  */
  async getPromotionPosts(req: Request) {
    const { category, city } = req.query;
    try {
      if (category === ALL_OID) {
        const whereArr = [["AND p.city_oid LIKE :city", city]];
        return await this.sequelize.query(
          `
          SELECT
            p.oid,
            p.category_oid,
            p.admin_oid,
            p.title,
            p.views,
            c.name AS category
          FROM
            post AS p
            INNER JOIN category AS c
                ON p.category_oid = c.oid
            WHERE p.promotion = true
            ${this.util.likeGenerator(whereArr, req.query)}
            ORDER BY -- 임시 더미 데이터 
                CASE
                  WHEN p.title = 'R&J풀빌라' then 0  
                END
        `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: req.query,
          }
        );
      } else {
        const whereArr = [
          ["AND p.category_oid LIKE :category", category],
          ["AND p.city_oid LIKE :city", city],
        ];
        return await this.sequelize.query(
          `
          SELECT
            p.oid,
            p.category_oid,
            p.admin_oid,
            p.title,
            p.views,
            c.name AS category
          FROM
            post AS p
            INNER JOIN category AS c
                ON p.category_oid = c.oid
            WHERE p.promotion = true
            ${this.util.likeGenerator(whereArr, req.query)}
        `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: req.query,
          }
        );
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
