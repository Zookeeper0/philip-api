import {
  Injectable,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { visit } from "./models";
import { v1 as uuid } from "uuid";

@Injectable()
export class AppService {
  constructor(private readonly seqeulize: Sequelize) {}

  /** GET 오늘 날짜 방문 카운트 획득 */
  async getVisitCount() {
    try {
      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      const visitData = await visit.count({
        where: {
          [Op.or]: [
            { createdAt: { [Op.between]: [startOfToday, endOfToday] } },
          ],
        },
      });

      return visitData;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  /** 오늘 방문했는지 체크, DB( visit )에 기록이없다면 ip와 기록저장  */
  async checkTodayVisit(req: Request, res: Response, ip: string) {
    //오늘 Date 객체 init
    const today = new Date();

    //오늘 방문했는지 알아내기 위한 date 하루 범위 생성
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const t = await this.seqeulize.transaction();
    try {
      const visited = await visit.findOne({
        where: {
          [Op.and]: [
            { ip: ip },
            { createdAt: { [Op.between]: [startOfToday, endOfToday] } },
          ],
        },
      });

      if (!visited) {
        await visit.create(
          {
            oid: uuid(),
            ip: ip,
          },
          { transaction: t }
        );
      }
      await t.commit();
    } catch (error) {
      Logger.log(error);
      await t.rollback();
      throw new InternalServerErrorException(error);
    }
  }
}
