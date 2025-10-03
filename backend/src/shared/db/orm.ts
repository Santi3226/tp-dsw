import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import "dotenv/config";
import fs from 'fs';

const getCACertificate = () => {
  const certPath = process.env.TIDB_CA_CERTIFICATE || '/etc/secrets/isrgrootx1.pem';
  
  try {
    const certContent = fs.readFileSync(certPath, 'utf8');
    console.log(`Certificado cargado: ${certContent.length} caracteres`);
    return certContent;
  } catch (error) {
    console.error(`Error leyendo certificado:`, error);
    throw error;
  }
};

export const orm = await MikroORM.init({
  entities: ['./dist/**/*Entity.js'],
  entitiesTs: ['./src/**/*Entity.ts'],
  driver: MySqlDriver,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '4000'),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
  highlighter: new SqlHighlighter(),
  debug: true,
  // La clave es NO usar driverOptions.ssl directamente
  // sino driverOptions.connection.ssl
  driverOptions: {
    connection: {
      ssl: {
        ca: getCACertificate(),
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
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