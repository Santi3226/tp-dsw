import { ObjectId } from 'mongodb';
export class Localidad {
  constructor(
    public   denominacion: string,
    public codPostal: string,
    public _id?: ObjectId,
    ) {}
}