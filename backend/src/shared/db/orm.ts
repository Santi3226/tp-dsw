import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import "dotenv/config";
import fs from 'fs';

// Función para obtener el CA certificate
const getCACertificate = () => {
  const certPath = process.env.TIDB_CA_CERTIFICATE;
  
  if (!certPath) {
    console.warn('TIDB_CA_CERTIFICATE no está definido');
    return undefined;
  }
  
  try {
    // Leer el contenido del archivo desde la ruta
    const certContent = fs.readFileSync(certPath, 'utf8');
    console.log('Certificado CA cargado correctamente desde:', certPath);
    return certContent;
  } catch (error) {
    console.error('Error al leer el certificado CA desde:', certPath, error);
    return undefined;
  }
};

export const orm = await MikroORM.init({
  entities: ['./dist/**/*Entity.js'],
  entitiesTs: ['./src/**/*Entity.ts'],
  clientUrl: process.env.DATABASE_URL,
  driver: MySqlDriver,
  highlighter: new SqlHighlighter(),
  debug: true,
  driverOptions: {
    ssl: {
      ca: getCACertificate(), // Ahora pasa el CONTENIDO, no la ruta
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