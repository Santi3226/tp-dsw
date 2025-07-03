import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const cli = new MongoClient(uri);
await cli.connect();
console.log("Conexión a MongoDB exitosa");
export let db: Db=cli.db('laboratorio');
