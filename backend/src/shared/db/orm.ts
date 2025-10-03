import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import "dotenv/config";
import fs from 'fs';
import { URL } from 'url';

// Parsear DATABASE_URL
const parseDbUrl = (url: string) => {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || '4000'),
    user: parsed.username,
    password: parsed.password,
    dbName: parsed.pathname.slice(1),
  };
};

const dbConfig = parseDbUrl(process.env.DATABASE_URL!);

// Función para obtener el CA certificate
const getCACertificate = () => {
  let certPath = process.env.TIDB_CA_CERTIFICATE || '/etc/secrets/isrgrootx1.pem';
  
  try {
    console.log(`Leyendo certificado CA desde: ${certPath}`);
    const certContent = fs.readFileSync(certPath, 'utf8');
    console.log(`Certificado CA cargado: ${certContent.length} caracteres`);
    return certContent;
  } catch (error) {
    console.error(`Error al leer certificado desde: ${certPath}`, error);
    throw error;
  }
};

export const orm = await MikroORM.init({
  entities: ['./dist/**/*Entity.js'],
  entitiesTs: ['./src/**/*Entity.ts'],
  driver: MySqlDriver,
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  dbName: dbConfig.dbName,
  highlighter: new SqlHighlighter(),
  debug: true,
  driverOptions: {
    ssl: {
      ca: getCACertificate(),
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
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