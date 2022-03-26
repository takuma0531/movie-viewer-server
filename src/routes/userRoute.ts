import { Request, Response, NextFunction, Router } from "express";
import { userController } from "../dependencyInjection/user";
import { authorization } from "../middlewares";

const router = Router();

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => userController.getAllUsers(req, res)
);

router.get(
  "/search",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => userController.getUsersByName(req, res)
);

router.get(
  "/user/:id",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => userController.getUserById(req, res)
);

router.post("/", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

router.put(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => userController.updateUser(req, res)
);

router.post("/login", (req: Request, res: Response) =>
  userController.loginUser(req, res)
);

router.delete(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => userController.deleteUser(req, res)
);

router.get(
  "/check-auth",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) =>
    userController.returnAuthorizedResult(req, res)
);

export { router };
