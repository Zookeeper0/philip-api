import { Controller, Get, Session } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get("/visit")
  findAll(@Session() session: Record<string, any>) {
    console.log("session", session);
    session.visits = session.visits ? session.visits + 1 : 1;
    return session.visits;
  }
}
