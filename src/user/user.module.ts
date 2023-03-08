import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Utils } from "src/util/common.utils";
import { kakaoUser } from "src/models";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

@Module({
  imports: [SequelizeModule.forFeature([kakaoUser])],
  controllers: [UserController],
  providers: [UserService, UserRepository, Utils],
})
export class AdminModule {}
