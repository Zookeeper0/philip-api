import {
  Controller,
  Get,
  InternalServerErrorException,
  Ip,
  Logger,
  Req,
  Res,
  Session,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";
import { AppService } from "./app.service";

@Controller("app")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly seqeulize: Sequelize
  ) {}

  @Get("/")
  async checkTodayVisit(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.appService.checkTodayVisit(request, response);
  }

  @Get("/visit")
  async getVisitCount() {
    return this.appService.getVisitCount();
  }
}
