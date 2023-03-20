import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(`${process.env.SSL_KEY_PATH}`, "utf8"),
  //   cert: fs.readFileSync(`${process.env.SSL_CRT_PATH}`, "utf8"),
  // };

  // const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: 'http://localhost:3001/',
    // allowedHeaders: ['content-type'],
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
