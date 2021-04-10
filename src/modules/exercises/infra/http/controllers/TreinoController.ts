import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateTreinoService from "@modules/exercises/services/CreateTreinoService";
import IndexTreinoService from "@modules/exercises/services/IndexTreinoService";


export default class TreinoController {

  public async createTreino(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { data_treino, aquecimento, tecnica, wood } = request.body;

    const createTreinoService = container.resolve(CreateTreinoService);

    const treino = await createTreinoService.execute({ user_id, data_treino, aquecimento, tecnica, wood });

    return response.json(classToClass(treino));
  }

  public async indexTreinos(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const indexTreinoService = container.resolve(IndexTreinoService);

    const treinos = await indexTreinoService.execute(user_id);

    return response.json(classToClass(treinos));
  }

}
