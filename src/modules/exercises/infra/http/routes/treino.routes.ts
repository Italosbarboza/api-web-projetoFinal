import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import TreinoController from "../controllers/TreinoController";

import authMiddleware from "../middlewares/auth";

const treinoRouter = Router();
const treinoController = new TreinoController();

treinoRouter.use(authMiddleware);

treinoRouter.post("/", treinoController.createTreino);

treinoRouter.post("/treinoUsuario", treinoController.createTreinoUsuario);

treinoRouter.get("/treinoDia", treinoController.indexTreinosDia);

treinoRouter.get("/", treinoController.indexTreinos);

treinoRouter.get("/treinoUsuario", treinoController.indexTreinoUsuario);

treinoRouter.delete("/:id_delete", treinoController.deleteTreino);


export default treinoRouter;
