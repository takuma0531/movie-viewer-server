import { Request, Response, NextFunction, Router } from "express";
// controller
// authorization as middle

const router = Router();

router.get("/", (req: Request, res: Response) => res.send(200));

// search?name=""
router.get("/search", (req: Request, res: Response) => res.send(req.query));

router.get("/:id", (req: Request, res: Response) => res.send(req.params.id));

router.post("/", (req: Request, res: Response) => res.send(req.body));

router.put("/", (req: Request, res: Response) => res.send(req.body));

router.post("/login", (req: Request, res: Response) => res.send(req.body));

router.delete("/", (req: Request, res: Response) => res.send(200));

export { router };
