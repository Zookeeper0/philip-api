import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";
import { Utils } from "src/util/common.utils";
import { Logger } from "@nestjs/common/services";
import { post } from "src/models";

@Injectable()
export class AdminRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly util: Utils
  ) {}
}
