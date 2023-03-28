import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Bind,
  Delete,
  Req,
} from "@nestjs/common";
import {
  Patch,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common/decorators";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";
import { multerDiskOptions } from "src/common/multerOptions";
import { JwtKakaoAuthGuard } from "src/auth/guard/kakao.auth.guard";
import { Request } from "express";
import { JwtUserAuthGuard } from "src/auth/guard/admin.auth.guard";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsService: PostsService
  ) {}

  /** GET 모든 게시물 */
  @Get("/")
  getAllPosts(@Req() req: Request) {
    return this.postsRepository.getAllPosts(req);
  }

  /** GET 모든 프로모션 게시물  */
  @Get("/promotion")
  getPromotionPosts(@Req() req: Request) {
    return this.postsRepository.getPromotionPosts(req);
  }

  /** 게시글 등록 */
  /** FilesInterceptor의 첫번째 속성 이름이 formData의 이미지가 담겨있는 key값과 같아야한다.*/
  // @UseGuards(JwtUserAuthGuard)
  @Post("/")
  @UseInterceptors(FilesInterceptor("files", null, multerDiskOptions))
  @Bind(UploadedFiles())
  addPost(
    filesData: Array<Express.Multer.File>,
    @Body() body,
    @Req() req: Request
  ) {
    const data = JSON.parse(body.content);
    return this.postsService.addPost(data, filesData, req.user);
  }

  @Delete("/:oid")
  async deletePost(@Param("oid") oid: string) {
    return this.postsService.deletePost(oid);
  }

  /**  GET 디테일 페이지 정보 요청 */
  // @UseGuards(JwtKakaoAuthGuard)
  @Get("/:oid")
  async getOnePost(@Param("oid") oid: string, @Req() req: Request) {
    console.log("Req!!! :", req.headers);
    await this.postsService.countViews(oid);
    return this.postsRepository.getOnePost(oid);
  }

  /** 디테일 페이지 들어갈때 방문자수 카운트 */
  @Patch("/:oid")
  patchViews(@Param("oid") countOid: string) {
    return this.postsService.countViews(countOid);
  }
}
