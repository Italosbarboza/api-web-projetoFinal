import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ProfileController from "../controllers/ProfileController";

import authMiddleware from "../middlewares/auth";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(authMiddleware);

profileRouter.get("/", profileController.show);

profileRouter.get("/alunos/all", profileController.indexAluno);

profileRouter.delete("/aluno/:id_delete", profileController.deleteAluno);

profileRouter.get("/professores/all", profileController.indexProfessores);

profileRouter.delete("/professor/:id_delete", profileController.deleteProfessor);


profileRouter.put(
  "/:id_update",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email(),
      nome: Joi.string(),
      idade: Joi.number(),
      telefone: Joi.number(),
      nivel_acesso: Joi.number(), 
      cpf: Joi.string(), 
      senha: Joi.string(),
    },
  }),
  profileController.update,
);

export default profileRouter;
