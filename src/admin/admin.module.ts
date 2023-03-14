import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminRepository } from "./admin.repository";
import { Utils } from "src/util/common.utils";
import { admin, category, city } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature([admin, category, city])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, Utils],
})
export class AdminModule {}
