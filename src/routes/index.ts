import { Request, Response, Router } from "express";
import { router as artistRouter } from "./artistRoute";
import { router as commentRouter } from "./commentRoute";
import { router as directorRouter } from "./directorRoute";
import { router as genreRouter } from "./genreRoute";
import { router as movieRouter } from "./movieRoute";
import { router as ratingRouter } from "./ratingRoute";
import { router as userRouter } from "./userRoute";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  res.send("<h1>Server is running</h1>")
);

export {
  router as RouterToConfirmRunning,
  artistRouter,
  commentRouter,
  directorRouter,
  genreRouter,
  movieRouter,
  ratingRouter,
  userRouter,
};
