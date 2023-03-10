import { Controller, Post, Logger, Get, Body, Param } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsService: PostsService
  ) {}

  @Get("/")
  getAllPosts() {
    return this.postsRepository.getAllPosts();
  }

  @Post("/")
  addPost(@Body() data: CreatePostDto) {
    return this.postsService.addPost(data);
  }

  @Get("/:oid")
  getOnePost(@Param("oid") oid) {
    console.log(oid);
    return this.postsService.getOnePost(oid);
  }

  // 카테고리에 따른 메뉴 불러오기
  @Get("/category/:oid")
  getCategoryPosts(@Param("oid") oid) {
    console.log(oid);
    return this.postsService.getCategoryPosts(oid);
  }
}
