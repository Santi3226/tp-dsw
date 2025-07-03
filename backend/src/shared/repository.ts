//Referencias a acceso a base de datos
//Cuando no es a base de datos, estas creando los DAO

export interface Respository<T>
{
  findAll(): Promise<T[] | undefined>;
  findOne(item: {id:string}): Promise<T | undefined>;
  add(item: T): Promise<T | undefined>;
  update(item: T): Promise<T | undefined>;
  delete(item: {id:string}): Promise<T | undefined>;
}