import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { admin } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature([admin])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
