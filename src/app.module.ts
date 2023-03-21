import * as dotenv from "dotenv";
dotenv.config();
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./admin/admin.module";
import { PostsModule } from "./posts/posts.module";
import { MulterModule } from "@nestjs/platform-express/multer";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CategoryModule } from "./category/category.module";
import { visit } from "./models";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      timezone: "+09:00",
    }),
    SequelizeModule.forFeature([visit]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
    }),
    MulterModule.register({
      dest: "./uploads",
    }),
    AuthModule,
    AdminModule,
    PostsModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
