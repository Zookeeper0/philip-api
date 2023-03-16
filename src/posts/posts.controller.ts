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
import { FilesInterceptor } from "@nestjs/platform-express/multer";
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
  getAllPosts(
    @Query("category") category: string,
    @Query("search") search: string
  ) {
    return this.postsRepository.getAllPosts(category, search);
  }

  /** FilesInterceptor의 첫번째 속성 이름이 formData의 이미지가 담겨있는 key값과 같아야한다.*/
  @Post("/")
  @UseInterceptors(FilesInterceptor("files", null, multerDiskOptions))
  @Bind(UploadedFiles())
  addPost(files: Express.Multer.File, @Body() body) {
    const data = JSON.parse(body.content);
    return this.postsService.addPost(data, files);
  }

  @Get("/:oid")
  getOnePost(@Param("oid") oid) {
    return this.postsRepository.getOnePost(oid);
  }

  // @Post("/images")
  // @UseInterceptors(FilesInterceptor("file", null, multerDiskOptions))
  // @Bind(UploadedFiles())
  // uploadFile(files, @Res() res: Response) {
  //   const data = files.map((v) => v.filename);
  //   return res.json(data);
  // }
}
