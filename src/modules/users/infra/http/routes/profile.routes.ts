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
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password")),
    },
  }),
  profileController.update,
);

export default profileRouter;
