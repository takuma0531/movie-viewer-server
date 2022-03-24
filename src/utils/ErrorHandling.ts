import { Request, Response, NextFunction } from "express";

export const use =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const catchError = function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  res.status(500).send({ message: err.message || err });
};
