import { describe, it, expect, beforeEach, vi } from 'vitest';
import { findAll, findOne } from '../centroAtencion/centroatencionController.js';
import { orm } from '../shared/db/orm.js';

// dummy del EntityManager
vi.mock('../shared/db/orm.js', () => ({
  orm: {
    em: {
      find: vi.fn(),
      findOneOrFail: vi.fn(),
    },
  },
}));

//crear reqs res falsos para ir testeando las respuestas
describe('CentroAtencion Controller', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  //estos son los datos q devuelve la false bd
  it('findAll - debe retornar todos los centros', async () => {
    const mockCentros = [
      { id: 1, nombre: 'Centro 1', domicilio: 'Calle 1' },
      { id: 2, nombre: 'Centro 2', domicilio: 'Calle 2' },
    ];

    vi.mocked(orm.em.find).mockResolvedValue(mockCentros);

    await findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Todos los centros encontrados: ',
      data: mockCentros,
    });
  });
  
//test ok
  it('findOne - debe retornar un centro por ID', async () => {
    const mockCentro = { id: 1, nombre: 'Centro 1', domicilio: 'Calle 1' };
    
    req.params.id = '1';
    vi.mocked(orm.em.findOneOrFail).mockResolvedValue(mockCentro);

    await findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Centro encontrado: ',
      data: mockCentro,
    });
  });
//test 404 - no hay centro 999
  it('findOne - debe retornar 404 si no encuentra el centro', async () => {
    req.params.id = '999';
    vi.mocked(orm.em.findOneOrFail).mockRejectedValue(
      new Error('CentroAtencion not found')
    );

    await findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Centro not found' });
  });
});