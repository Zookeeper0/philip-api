import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Bind,
  Delete,
  Res,
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
import { Request, Response } from "express";
import { JwtUserAuthGuard } from "src/auth/guard/admin.auth.guard";
import { files } from "src/models";

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

  /** GET admin 업체관리 페이지 dataSource */
  @Get("/store")
  getAdminStorePosts(@Req() req: Request) {
    return this.postsRepository.getAdminStorePosts(req);
  }

  /** GET 모든 프로모션 게시물  */
  @Get("/promotion")
  getPromotionPosts(@Req() req: Request) {
    return this.postsRepository.getPromotionPosts(req);
  }

  /** 게시글 등록 */
  @UseGuards(JwtUserAuthGuard)
  @Post("/")
  addPost(@Body() body, @Req() req: Request) {
    return this.postsService.addPost(body.content, body.files, req.user);
  }

  @Delete("/:oid")
  deletePost(@Param("oid") oid: string) {
    return this.postsService.deletePost(oid);
  }

  /**  GET 디테일 페이지 정보 요청 */
  // @UseGuards(JwtKakaoAuthGuard)
  @Get("/:oid")
  async getOnePost(@Param("oid") oid: string, @Req() req: Request) {
    await this.postsService.countViews(oid);
    return this.postsRepository.getOnePost(oid);
  }
  /** 디테일 페이지 들어갈때 방문자수 카운트 */
  @Patch("/:oid")
  patchViews(@Param("oid") countOid: string) {
    return this.postsService.countViews(countOid);
  }

  /** 이미지 미리보기 업로드 */
  /** FilesInterceptor의 첫번째 속성 이름이 formData의 이미지가 담겨있는 key값과 같아야한다.*/
  @Post("/images")
  @UseInterceptors(FilesInterceptor("files", null, multerDiskOptions))
  @Bind(UploadedFiles())
  uploadImages(filesData: Array<Express.Multer.File>, @Res() res: Response) {
    return res.json(filesData);
  }

  /** 미리보기 이미지 삭제 */
  @Delete("/images/:file")
  deleteImages(@Param("file") fileName: string) {
    return this.postsService.deleteImages(fileName);
  }

  /**  GET 디테일 페이지 정보 요청 */
  // @UseGuards(JwtKakaoAuthGuard)
  @Get("/test/:oid")
  getOnePostTest(@Param("oid") oid: string, @Req() req: Request) {
    console.log("oid", oid);
    return this.postsService.getOnePostTest(oid);
  }
}
