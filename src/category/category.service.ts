import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { category, city } from "src/models";
import { Utils } from "src/util/common.utils";
import { v1 as uuid } from "uuid";
import { CategoryDto } from "./dto/category.dto";
import { CityDto } from "./dto/city.dto";

@Injectable()
export class CategoryService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly util: Utils
  ) {}

  /** POST 카테고리 생성 ( 관리자 ) */
  async createCategory(categoryDto: CategoryDto) {
    const t = await this.seqeulize.transaction();
    try {
      const oid = uuid();
      categoryDto.oid = oid;
      Logger.log(categoryDto);
      const categoryData = await category.create(categoryDto);
      await t.commit();
    } catch (error) {
      Logger.error(error);
      await t.rollback();
      throw new InternalServerErrorException(error);
    }
  }

  /** POST City 카테고리 생성, ( 앙헬레스, 세부, 마닐라, ? ) */
  async createCity(cityDto: CityDto) {
    const t = await this.seqeulize.transaction();
    try {
      const oid = uuid();
      cityDto.oid = oid;
      const cityData = await city.create(cityDto);
      await t.commit();
    } catch (error) {
      Logger.error(error);
      await t.rollback();
      throw new InternalServerErrorException(error);
    }
  }
}
