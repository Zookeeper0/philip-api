import {
  Injectable,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { visit } from "./models";
import { v1 as uuid } from "uuid";

@Injectable()
export class AppService {
  constructor(private readonly seqeulize: Sequelize) {}

  async getVisitCount() {
    const t = await this.seqeulize.transaction();
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

      await t.commit();
      return visitData;
    } catch (err) {
      await t.rollback();
      Logger.error(err);
      throw new UnauthorizedException();
    }
  }

  async checkTodayVisit(request, response) {
    // 'connect.sid'는 express session id를 저장하는 쿠키값인데, 여기서는 브라우저가 쿠키사용 금지인지 아닌지 판단하는 용도로 쓰였습니다. 만약 단순히 쿠키값이 없는 경우 카운팅을 하게 되면 브라우저가 쿠키사용 금지인 경우 페이지를 열때마다 계속해서 카운터가 올라가게 됩니다.

    // cookie = 'count' 가 있으면 카운트 함수를 실행시키지 않는다
    // if(!req.cookies.count&&req.cookies['connect.sid']){}
    if (!request.cookies.count) {
      // count 쿠키가 가 없으면 한시간짜리 타임 쿠키 count로 준다.
      response.cookie("count", "setCookie", {
        maxAge: 3600000,
        httpOnly: true,
      });

      var now = new Date();
      var date = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate();
      console.log("data  :", date);

      // 'count'가 없는 경우 오늘의 날짜를 구하고, 'countData'의 쿠키의 날짜값과 비교합니다.
      // 날짜값이 다른 경우 DB에 있는 visitors라는 데이터를 불러오는데, 이 데이터가 없는 경우에는 새로 생성합니다.
      if (date != request.cookies.countDate) {
        response.cookie("countDate", date, {
          maxAge: 86400000,
          httpOnly: true,
        });
        console.log("test Hello");
        // 위의 쿠키 데이터 countDate(오늘날짜), count(총방문자카운트 주기) 설정 후 방문자 ip저장
        const t = await this.seqeulize.transaction();
        try {
          const data = {
            oid: uuid(),
            ip: request.ip,
          };
          await visit.create(data, { transaction: t });
          await t.commit();
        } catch (err) {
          await t.rollback();
          Logger.log(err);
          throw new InternalServerErrorException(err);
        }
      }
    }
  }
}
