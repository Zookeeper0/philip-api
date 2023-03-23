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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string
  ) {
    return this.appService.checkTodayVisit(req, res, ip);
  }

  @Get("/visit")
  async getVisitCount() {
    return this.appService.getVisitCount();
  }
}
