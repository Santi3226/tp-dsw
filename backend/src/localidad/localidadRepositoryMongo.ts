/*import { Respository } from "../shared/repository";
import { Localidad } from "./localidadEntity.js";
import { db } from "../shared/db/connMongo.js";
import { ObjectId } from 'mongodb'; // Importar ObjectId para manejar IDs de MongoDB

const localidades = db.collection<Localidad>('localidad'); // Coleccion de localidades en la base de datos
export class LocalidadRepository implements Respository<Localidad>{
  
  public async findAll(): Promise<Localidad[] | undefined> {
      return await localidades.find().toArray(); // Devuelve todas las localidades
  }

  public async findOne(item: { id: string; }): Promise<Localidad | undefined> {
    const _id = new ObjectId(item.id);
    return (await localidades.findOne({_id})) || undefined; //Asegurar q la ejecucion termine aca
  }

  public async add(item: Localidad): Promise<Localidad | undefined> {
    await localidades.insertOne(item);
    return item;
  }

  public async update(id:string, item: Localidad): Promise<Localidad | undefined> {
    const _id = new ObjectId(id)
    return (await localidades.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined
  }
  
  public async delete(item: { id: string; }): Promise<Localidad | undefined> {
    const _id = new ObjectId(item.id);
    return (await localidades.findOneAndDelete({_id})) || undefined;
   } // Devuelve la localidad eliminada o undefined si no se
}*/
