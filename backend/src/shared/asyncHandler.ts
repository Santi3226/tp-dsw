import { RequestHandler, Request, Response, NextFunction } from 'express';

// Async handler : funcion q devuelve una promesa - rta al error de response de ts
export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// Como la operacion crud no maneja los errores de promesa, los maneja con esto
export const asyncHandler = (fn: AsyncHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
