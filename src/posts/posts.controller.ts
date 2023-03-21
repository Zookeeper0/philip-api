import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Bind,
  UseGuards,
} from "@nestjs/common";
import {
  Patch,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common/decorators";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";
import { multerDiskOptions } from "src/common/multerOptions";
import { JwtAuthGuard } from "src/auth/guard/auth.guard";

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
  @UseGuards(JwtAuthGuard)
  async getOnePost(@Param("oid") oid: string) {
    await this.postsService.countViews(oid);
    return this.postsRepository.getOnePost(oid);
  }

  /** 디테일 페이지 들어갈때 방문자수 카운트 */
  @Patch("/:oid")
  patchViews(@Param("oid") countOid: string) {
    return this.postsService.countViews(countOid);
  }
}
