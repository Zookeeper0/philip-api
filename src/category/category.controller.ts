import { Controller, Post, Logger, Body, Get } from "@nestjs/common";
import { CityDto } from "./dto/city.dto";
import { CategoryDto } from "./dto/category.dto";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";

@Controller("category")
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryRepository: CategoryRepository
  ) {}

  // 카테고리 생성
  @Post("/")
  addCategory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  /** 모든 카테고리 데이터 프론트 상단 nav 항목 */
  @Get("/")
  getAllCategory() {
    return this.categoryRepository.getAllCategory();
  }
  /** 씨티카테고리 추가 */
  @Post("/city")
  addCity(@Body() cityDto: CityDto) {
    return this.categoryService.createCity(cityDto);
  }

  /** 씨티카테고리 항목 획득 */
  @Get("/city")
  getAllCity() {
    return this.categoryRepository.getAllCity();
  }
}
