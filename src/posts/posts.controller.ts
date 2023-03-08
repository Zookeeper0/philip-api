import { Controller, Post, Logger, Get, Body, Req } from "@nestjs/common";
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
}
