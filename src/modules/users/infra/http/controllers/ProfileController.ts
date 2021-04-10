import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import IndexAlunoProfileService from "@modules/users/services/IndexAlunoProfileService";
import IndexProfessorProfileService from "@modules/users/services/IndexProfessorProfileService";
import DeleteAlunoService from "@modules/users/services/DeleteAlunoService";
import DeleteProfessorService from "@modules/users/services/DeleteProfessorService";


export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async indexAluno(request: Request, response: Response): Promise<Response> {

    const indexAlunoProfileService = container.resolve(IndexAlunoProfileService);

    const user = await indexAlunoProfileService.execute();

    return response.json(classToClass(user));
  }

  public async indexProfessores(request: Request, response: Response): Promise<Response> {

    const indexProfessorProfileService = container.resolve(IndexProfessorProfileService);

    const user = await indexProfessorProfileService.execute();

    return response.json(classToClass(user));
  }

  public async deleteAluno(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;

    const { id_delete } = request.params;

    console.log(id_delete);
   
    const deleteAlunoService = container.resolve(
      DeleteAlunoService,
    );

    const users = await deleteAlunoService.execute({
      user_id,
      id_delete,
    });

    return response.json({message: 'ok'});  
  }

  public async deleteProfessor(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;

    const { id_delete } = request.params;

    console.log(id_delete);
   
    const deleteProfessorService = container.resolve(
      DeleteProfessorService,
    );

    const users = await deleteProfessorService.execute({
      user_id,
      id_delete,
    });

    return response.json({message: 'ok'});  
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id_update } = request.params;

    const { nome, email, idade, telefone, cpf, senha } = request.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      id_update,
      nome,
      email,
      idade,
      telefone,
      cpf,
      senha,
    });

    return response.json(classToClass(user));
  }
}
