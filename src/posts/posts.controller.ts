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
  Patch,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common/decorators";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";
import { Response } from "express";
import { multerDiskOptions } from "src/common/multerOptions";

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

  @Get("/promotion")
  getPromotionPosts(@Query("category") category: string) {
    console.log("Hello promotion");
    console.log("category", category);
    Logger.error("Hello");
    return this.postsRepository.getPromotionPosts(category);
  }

  /** FilesInterceptor의 첫번째 속성 이름이 formData의 이미지가 담겨있는 key값과 같아야한다.*/
  @Post("/")
  @UseInterceptors(FilesInterceptor("files", null, multerDiskOptions))
  @Bind(UploadedFiles())
  addPost(filesData: Array<Express.Multer.File>, @Body() body) {
    const data = JSON.parse(body.content);
    return this.postsService.addPost(data, filesData);
  }

  @Get("/:oid")
  getOnePost(@Param("oid") oid) {
    this.postsService.countViews(oid);
    return this.postsRepository.getOnePost(oid);
  }

  /** 디테일 페이지 들어갈때 방문자수 카운트 */
  @Patch("/:oid")
  patchViews(@Param("oid") countOid: string) {
    return this.postsService.countViews(countOid);
  }

  // @Post("/images")
  // @UseInterceptors(FilesInterceptor("file", null, multerDiskOptions))
  // @Bind(UploadedFiles())
  // uploadFile(files, @Res() res: Response) {
  //   const data = files.map((v) => v.filename);
  //   return res.json(data);
  // }
}
