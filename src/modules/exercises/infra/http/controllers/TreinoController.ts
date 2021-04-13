import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateTreinoService from "@modules/exercises/services/CreateTreinoService";
import IndexTreinoService from "@modules/exercises/services/IndexTreinoService";
import IndexTreinoDiaService from "@modules/exercises/services/IndexTreinoDiaService";
import CreateTreinoUsuarioService from "@modules/exercises/services/CreateTreinoUsuarioService";
import DeleteTreinoService from "@modules/exercises/services/DeleteTreinoService";

export default class TreinoController {

  public async createTreino(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { aquecimento, tecnica, wood } = request.body;

    const createTreinoService = container.resolve(CreateTreinoService);

    const treino = await createTreinoService.execute({ user_id, aquecimento, tecnica, wood });

    return response.json(classToClass(treino));
  }

  public async createTreinoUsuario(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { id_treino, quilocalorias_queimadas, batimento_cardiaco, massa_muscular, porcentagem_gordura } = request.body;

    const createTreinoUsuarioService = container.resolve(CreateTreinoUsuarioService);

    const id_usuario = Number(user_id);

    const treino = await createTreinoUsuarioService.execute({ id_usuario, id_treino, quilocalorias_queimadas, batimento_cardiaco, massa_muscular, porcentagem_gordura });

    return response.json(classToClass(treino));
  }

  public async indexTreinos(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const indexTreinoService = container.resolve(IndexTreinoService);

    const treinos = await indexTreinoService.execute(user_id);

    return response.json(classToClass(treinos));
  }

  public async indexTreinosDia(request: Request, response: Response): Promise<Response> {
    
    const indexTreinoDiaService = container.resolve(IndexTreinoDiaService);

    const treinos = await indexTreinoDiaService.execute();

    return response.json(classToClass(treinos));
  }

  public async deleteTreino(request: Request, response: Response): Promise<Response> {

    const { id_delete } = request.params;
    
    const deleteTreinoService = container.resolve(DeleteTreinoService);

    const numero = await deleteTreinoService.execute(id_delete);

    const id = Number(numero);

    return response.json(id);
  }

}
