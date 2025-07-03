import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const cli = new MongoClient(uri);
await cli.connect();
export let db: Db=cli.db('localidad');
