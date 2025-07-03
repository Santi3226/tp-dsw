/*
import { Respository } from "../shared/repository";
import { Localidad } from "./localidadEntity.js";

const localidades: Localidad[] = [
  new Localidad("San Jose", "2185"),
  new Localidad("Rosario", "2000"),
  new Localidad("VGG", "2100")
];

export class LocalidadRepository implements Respository<Localidad>{
  
  public async findAll(): Promise<Localidad[] | undefined> {
      return await localidades;
  }

  public async findOne(item: { codPostal: string; }): Promise<Localidad | undefined> {
    const localidad = localidades.find(c => c.codPostal === item.codPostal);
    if(localidad)return await localidad; //Asegurar q la ejecucion termine aca
  }

  public async add(item: Localidad): Promise<Localidad | undefined> {
    await localidades.push(item);
    return item;
  }

  public async update(item: Localidad): Promise<Localidad | undefined> {
    const index = await localidades.findIndex(c => c.codPostal === item.codPostal);
    if(index!==-1) {return Object.assign(localidades[index],item)};
  }
  
  public async delete(item: { codPostal: string; }): Promise<Localidad | undefined> {
    const index = await localidades.findIndex(c => c.codPostal === item.codPostal);
    if(index!==-1)
    {
    const localidad = localidades[index];
    localidades.splice(index,1);
    return localidad;
  }
  }
}*/