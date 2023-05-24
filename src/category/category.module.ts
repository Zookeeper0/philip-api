import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { category, city } from "src/models";
import { Utils } from "src/util/common.utils";
import { CategoryController } from "./category.controller";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";

@Module({
  imports: [SequelizeModule.forFeature([category, city])],
  controllers: [CategoryController],
  providers: [CategoryService, Utils, CategoryRepository],
})
export class CategoryModule {}
