import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  Query,
  Bind,
  Delete,
  Res,
  Req,
  Put,
} from "@nestjs/common";
import {
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
  @UseGuards(JwtUserAuthGuard)
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
  @UseGuards(JwtKakaoAuthGuard)
  @Get("/:oid")
  async getOnePostTest(@Param("oid") oid: string) {
    await this.postsService.countViews(oid);
    return this.postsService.getOnePost(oid);
  }

  @UseGuards(JwtUserAuthGuard)
  @Put("/store/edit")
  editPost(@Body() body) {
    return this.postsService.editPost(body);
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
  @Delete("/images/preview/:file")
  deletePreviewImages(@Param("file") fileName: string) {
    return this.postsService.deletePreviewImages(fileName);
  }

  /** 업체 수정시 이미지 삭제 */
  @Delete("images/:file")
  deleteImage(@Param("file") oid: string) {
    return this.postsService.deleteImage(oid);
  }

  /** admin 업체 수정시 정보 GET */
  @UseGuards(JwtUserAuthGuard)
  @Get("/edit/:oid")
  getEditPostInfo(@Param("oid") oid: string) {
    return this.postsService.getEditPostInfo(oid);
  }

  @Patch("/promotion/:oid")
  updatePromotion(@Param("oid") oid: string) {
    return this.postsService.updatePromotion(oid);
  }
}
