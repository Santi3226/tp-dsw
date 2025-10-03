import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import "dotenv/config";
import fs from 'fs';

// Función para obtener el CA certificate
const getCACertificate = () => {
  // Intentar con variable de entorno primero
  let certPath = process.env.TIDB_CA_CERTIFICATE;
  
  // Si no está definida, usar la ruta por defecto de Render
  if (!certPath) {
    certPath = '/etc/secrets/isrgrootx1.pem';
    console.log('⚠️  TIDB_CA_CERTIFICATE no definido, usando ruta por defecto:', certPath);
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