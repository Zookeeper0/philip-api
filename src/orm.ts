import * as dotenv from "dotenv";
dotenv.config();

import {
  IConfig,
  ModelBuilder,
  DialectPostgres,
} from "sequelize-typescript-generator";

(async () => {
  const config: IConfig = {
    connection: {
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      timezone: "+09:00",
    },
    metadata: {
      indices: true,
      case: "CAMEL",
    },
    output: {
      clean: true,
      outDir: "./src/models",
    },
    strict: true,
  };

  const dialect = new DialectPostgres();
  const builder = new ModelBuilder(config, dialect);

  try {
    await builder.build();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
