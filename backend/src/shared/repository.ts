//Referencias a acceso a base de datos
//Cuando no es a base de datos, estas creando los DAO

export interface Respository<T>
{
  findAll(): T[] | undefined;
  findOne(item: {codPostal:string}): T | undefined;
  add(item: T): T | undefined;
  update(item: T): T | undefined;
  delete(item: {codPostal:string}): T | undefined;
}