import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import "dotenv/config";

export const orm = await MikroORM.init({
  entities: ['./dist/**/*Entity.js'],
  entitiesTs: ['./src/**/*Entity.ts'],
  clientUrl: process.env.DATABASE_URL,
  driver: MySqlDriver,
  highlighter: new SqlHighlighter(),
  debug: true,
  driverOptions: {
    ssl: process.env.TIDB_CA_CERTIFICATE 
      ? {
          rejectUnauthorized: true,
          ca: process.env.TIDB_CA_CERTIFICATE,
        }
      : {
          rejectUnauthorized: false, // Solo para desarrollo local
        },
  },
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  console.log('Schema actualizado.');
};