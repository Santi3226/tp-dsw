import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import "dotenv/config";
import fs from 'fs';

// Función para obtener el CA certificate
const getCACertificate = () => {
  const certPath = process.env.TIDB_CA_CERTIFICATE;
  
  if (!certPath) {
    console.error('⚠️  TIDB_CA_CERTIFICATE no está definido en las variables de entorno');
    console.error('⚠️  Asegúrate de configurar esta variable en Render apuntando a /etc/secrets/ca.pem');
    throw new Error('TIDB_CA_CERTIFICATE no está configurado');
  }
  
  try {
    console.log(`📄 Intentando leer certificado CA desde: ${certPath}`);
    const certContent = fs.readFileSync(certPath, 'utf8');
    console.log('✅ Certificado CA cargado correctamente');
    console.log(`📝 Tamaño del certificado: ${certContent.length} caracteres`);
    return certContent;
  } catch (error) {
    console.error(`❌ Error al leer el certificado CA desde: ${certPath}`);
    console.error(error);
    throw error;
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
      ca: getCACertificate(),
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