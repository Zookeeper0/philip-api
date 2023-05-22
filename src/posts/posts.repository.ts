import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";
import { Logger } from "@nestjs/common/services";
import { Utils } from "src/util/common.utils";
import { Request } from "express";
import { category, files, post } from "src/models";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { Op } from "sequelize";

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
          p.store_name, 
          p.address,
          p.phone_number,
          p.contents,
          p.views,
          c.name AS category
        FROM
          post AS p 
          LEFT JOIN category AS c 
              ON p.category_oid = c.oid 
          WHERE p.oid = $oid;
        `,
      {
        type: sequelize.QueryTypes.SELECT,
        bind: { oid },
      }
    );
  }

  /** GET 모든 게시물 */
  async getAllPosts(req: Request) {
    try {
      const { city, search, category }: any = req.query;
      if (category === ALL_OID) {
        const whereArr = [
          ["AND  lower(p.store_name) LIKE :search", search.toLowerCase()],
          ["AND p.city_oid LIKE :city", city],
        ];
        //카테고리가 전체(디폴트값)이고 제목에 검색어가 포함됐나?
        return await this.sequelize.query(
          `
           SELECT
            p.oid,
            p.category_oid,
            p.admin_oid,
            p.store_name,
            p.views,
            c.name AS category,
            f.filename AS thumb
          FROM
            post AS p
            LEFT JOIN category AS c
                ON p.category_oid = c.oid
            LEFT JOIN files AS f
                ON p.oid = f.post_oid
                AND f.label = 'thumb'
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
          ["AND lower(p.store_name) LIKE :search", search.toLowerCase()],
          ["AND p.category_oid LIKE :category", category],
          ["AND p.city_oid LIKE :city", city],
        ];
        return await this.sequelize.query(
          `
          SELECT
            p.oid,
            p.category_oid,
            p.admin_oid,
            p.store_name,
            p.views,
            c.name AS category,
            f.filename AS thumb
          FROM
            post AS p
            LEFT JOIN category AS c
                ON p.category_oid = c.oid
            LEFT JOIN files AS f
                ON p.oid = f.post_oid
                AND f.label = 'thumb'
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
    const { city, category } = req.query;
    try {
      if (category === ALL_OID) {
        const whereArr = [["AND p.city_oid LIKE :city", city]];
        return await this.sequelize.query(
          `
          SELECT
            p.oid,
            p.category_oid,
            p.admin_oid,
            p.store_name,
            p.views,
            c.name AS category,
            f.filename AS thumb
          FROM
            post AS p
            LEFT JOIN category AS c
                ON p.category_oid = c.oid
            LEFT JOIN files AS f
                ON p.oid = f.post_oid
                AND f.label = 'thumb'
            WHERE p.promotion = true
            ${this.util.likeGenerator(whereArr, req.query)}
            ORDER BY
                p.order ASC;
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
              p.store_name,
              p.views,
              c.name AS category,
              f.filename AS thumb
          FROM
            post AS p
            LEFT JOIN category AS c
                ON p.category_oid = c.oid
            LEFT JOIN files AS f
                ON p.oid = f.post_oid
                AND f.label = 'thumb'
            WHERE p.promotion = true
            ${this.util.likeGenerator(whereArr, req.query)}
            ORDER BY
                p.order ASC;
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

  /** 업체관리 페이지 업체리스트 가져오기 */
  async getAdminStorePosts(req: Request) {
    try {
      const { search, category, promotion }: any = req.query;
      if (category === ALL_OID) {
        console.log("promotion", typeof promotion, promotion);
        const whereArr = [
          ["AND lower(p.store_name) LIKE :search", search.toLowerCase()],
          ["AND p.promotion = true", promotion === "true" ? true : false],
        ];

        return await this.sequelize.query(
          `
            SELECT 
              p.oid, 
              p.admin_oid,
              p.store_name, 
              p.address,
              p.phone_number,
              p.contents,
              p.views,
              p.created_at,
              p.owner_name,
              p.promotion,
              p.order,
              c.name AS category,
              t.name AS city
            FROM 
              post AS p 
              LEFT JOIN category AS c
                ON p.category_oid = c.oid
              LEFT JOIN city AS t
                ON p.city_oid = t.oid
              WHERE TRUE
              ${this.util.likeGenerator(whereArr, req.query)}
              ORDER BY p.created_at DESC
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: req.query,
          }
        );
      } else {
        const whereArr = [
          ["AND lower(p.store_name) LIKE :search", search.toLowerCase()],
          ["AND p.category_oid LIKE :category", category],
          ["AND p.promotion = true", promotion === "true" ? true : false],
        ];
        return await this.sequelize.query(
          `
           SELECT 
              p.oid, 
              p.admin_oid,
              p.store_name, 
              p.address,
              p.phone_number,
              p.contents,
              p.views,
              p.created_at,
              p.owner_name,
              p.promotion,
              p.order,
              c.name AS category,
              t.name AS city
            FROM 
              post AS p 
              LEFT JOIN category AS c
                ON p.category_oid = c.oid
              LEFT JOIN city AS t
                ON p.city_oid = t.oid
              WHERE TRUE
              ${this.util.likeGenerator(whereArr, req.query)}
              ORDER BY p.created_at DESC
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
