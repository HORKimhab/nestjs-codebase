import { ConfigModule } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

ConfigModule.forRoot({
  envFilePath: '.env',
});

export const configDB: TypeOrmModuleOptions = { 
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(String(process.env.DB_PORT), 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}