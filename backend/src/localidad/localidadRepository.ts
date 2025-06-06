import { Respository } from "../shared/repository";
import { Localidad } from "./localidadEntity.js";

const localidades: Localidad[] = [
  new Localidad("San Jose", "2185"),
  new Localidad("Rosario", "2000"),
  new Localidad("VGG", "2100")
];

export class LocalidadRepository implements Respository<Localidad>{
  
  public findAll(): Localidad[] | undefined {
      return localidades;
  }

  public findOne(item: { codPostal: string; }): Localidad | undefined {
    const localidad = localidades.find(c => c.codPostal === item.codPostal);
    if(localidad)return localidad; //Asegurar q la ejecucion termine aca
  }

  public add(item: Localidad): Localidad | undefined {
    localidades.push(item);
    return item;
  }

  public update(item: Localidad): Localidad | undefined {
    const index = localidades.findIndex(c => c.codPostal === item.codPostal);
    if(index!==-1) {return Object.assign(localidades[index],item)};
  }
  
  public delete(item: { codPostal: string; }): Localidad | undefined {
    const index = localidades.findIndex(c => c.codPostal === item.codPostal);
    if(index!==-1)
    {
    const localidad = localidades[index];
    localidades.splice(index,1);
    return localidad;
  }
  }
}