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
  schemaGenerator: {
    disableForeignKeys: true, // Set to true if you want to disable foreign key checks
    createForeignKeyConstraints: true, // Set to true if you want to create foreign key constraints
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
  await generator.dropSchema(); // Uncomment to drop the schema
  await generator.createSchema(); // Uncomment to create the schema
*/
  await generator.updateSchema();
  console.log('Schema actualizado.');
};
