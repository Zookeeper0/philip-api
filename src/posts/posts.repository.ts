import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";
import { Utils } from "src/util/common.utils";
import { Logger } from "@nestjs/common/services";
import { post } from "src/models";

@Injectable()
export class PostsRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly util: Utils
  ) {}

  async getAllPosts() {
    try {
      return await post.findAll();
    } catch (err) {
      console.log(err);
      Logger.error(err);
    }
  }
}
