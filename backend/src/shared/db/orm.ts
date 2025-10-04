import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import "dotenv/config";
import fs from 'fs';

export const orm = await MikroORM.init({
  entities: ['./dist/**/*Entity.js'],
  entitiesTs: ['./src/**/*Entity.ts'],
  driver: MySqlDriver,
  clientUrl: process.env.clientUrl,
  dbName: process.env.dbName,
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema({ safe: true });
  console.log('Schema actualizado.');
};