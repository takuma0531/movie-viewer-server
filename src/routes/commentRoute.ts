import { Request, Response, NextFunction, Router } from "express";
import { commentController } from "../dependencyInjection/comment";
import { authorization } from "../middlewares";

const router = Router();

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => commentController.getAllComments(req, res)
);

router.get("/comment/:id", (req: Request, res: Response) =>
  commentController.getCommentById(req, res)
);

router.get(
  "/search",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyIfUserIsAdmin(req, res, next),
  (req: Request, res: Response) => commentController.getCommentByText(req, res)
);

router.get("/movie", (req: Request, res: Response) =>
  commentController.getCommentsByMovie(req, res)
);

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => commentController.createComment(req, res)
);

router.put(
  "/comment/:id",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => commentController.updateComment(req, res)
);

router.delete(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => commentController.deleteComment(req, res)
);

export { router };
