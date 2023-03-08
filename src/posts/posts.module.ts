import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { post } from "src/models";
import { Utils } from "src/util/common.utils";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";

@Module({
  imports: [SequelizeModule.forFeature([post])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, Utils],
})
export class PostsModule {}
