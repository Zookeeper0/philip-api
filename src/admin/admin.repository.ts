import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class AdminRepository {
  constructor(private readonly sequelize: Sequelize) {}
}
