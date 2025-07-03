import { Respository } from '../shared/repository';
import { Localidad } from './localidadEntity.js';
import { pool } from '../shared/db/connMySQL.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class LocalidadRepository implements Respository<Localidad> {
  public async findAll(): Promise<Localidad[] | undefined> {
    const [localidades] = await pool.query('SELECT * FROM localidad');
    return localidades as Localidad[]; //Se puede hacer si la clase no tiene metodos que deban ejecutarse
  }

  public async findOne(item: { id: string }): Promise<Localidad | undefined> {
    const id = Number.parseInt(item.id); // Convertir el id a número
    const [localidades] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM localidad WHERE id = ?',
      [id]
    ); //RowDataPacket es el tipo de dato que devuelve mysql2
    if (localidades.length == 0) {
      return undefined; // Si no se encuentra la localidad, devolver undefined
    }
    return localidades[0] as Localidad;
  }

  public async add(localidadInput: Localidad): Promise<Localidad | undefined> {
    const { id, ...localidadData } = localidadInput; // Excluir el id si no es necesario
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO localidad set ?',
      [localidadData]
    );
    localidadInput.id = result.insertId; // Asignar el id generado por la base de datos
    return localidadInput; // Devuelve la localidad insertada
  }

  public async update(
    id: string,
    localidadInput: Localidad
  ): Promise<Localidad | undefined> {
    const idNumber = Number.parseInt(id);
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE localidad SET ? WHERE id = ?',
      [localidadInput, idNumber]
    );
    localidadInput.id = idNumber;
    return localidadInput;
  }

  public async delete(item: { id: string }): Promise<Localidad | undefined> {
    try {
      const deletedItem = await this.findOne(item);
      if (!deletedItem) {
        return undefined; // Si no se encuentra la localidad, devolver undefined
      }
      const id = Number.parseInt(item.id);
      const [localidades] = await pool.query<RowDataPacket[]>(
        'DELETE FROM localidad where id = ?',
        [id]
      );
      return deletedItem as Localidad; // Devuelve la localidad insertada
    } catch (error: any) {
      throw new Error(`Error deleting localidad: ${error.message}`);
    }
  }
}
