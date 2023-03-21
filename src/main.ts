import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(`${process.env.SSL_KEY_PATH}`, "utf8"),
    cert: fs.readFileSync(`${process.env.SSL_CRT_PATH}`, "utf8"),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  // const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  await app.listen(3042);
}
bootstrap();
