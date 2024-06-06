import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  let app: any;

  if (process.env.NODE_ENV === "development") {
    app = await NestFactory.create(AppModule);
  } else {
    const httpsOptions = {
      key: fs.readFileSync(`${process.env.SSL_KEY_PATH}`, "utf8"),
      cert: fs.readFileSync(`${process.env.SSL_CRT_PATH}`, "utf8"),
    };

    app = await NestFactory.create(AppModule, { httpsOptions });
  }

  app.enableCors({
    // origin: 'http://localhost:3001/',
    // allowedHeaders: ['content-type'],
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
