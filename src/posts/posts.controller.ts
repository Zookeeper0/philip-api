import {
  Controller,
  Post,
  Logger,
  Get,
  Body,
  Param,
  Query,
  Bind,
  Req,
} from "@nestjs/common";
import {
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { multerDiskOptions } from "src/util/multer.options.factory";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";
import { Response } from "express";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsService: PostsService
  ) {}

  @Get("/")
  getAllPosts(@Query("category") category: string) {
    Logger.log("category key :", category);
    return this.postsRepository.getAllPosts(category);
  }

  @Post("/")
  addPost(@Body() data) {
    Logger.log("data", data);
    return this.postsService.addPost(data);
  }

  @Get("/:oid")
  getOnePost(@Param("oid") oid) {
    return this.postsRepository.getOnePost(oid);
  }

  @Post("/images")
  @UseInterceptors(FilesInterceptor("file", null, multerDiskOptions))
  @Bind(UploadedFiles())
  uploadFile(files, @Res() res: Response) {
    const data = files.map((v) => v.filename);
    return res.json(data);
  }

  // 카테고리에 따른 메뉴 불러오기
  @Get("/category/:oid")
  getCategoryPosts(@Param("oid") oid) {
    console.log(oid);
    return this.postsService.getCategoryPosts(oid);
  }
}
