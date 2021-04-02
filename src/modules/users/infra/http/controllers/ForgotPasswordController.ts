
import { Request, Response } from "express";
import { container } from "tsyringe";

import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";
import CreatePasswordService from "@modules/users/services/CreatePasswordService";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { email, cpf } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    const responseEmail = await sendForgotPasswordEmail.execute({
      email,
      cpf,
    });
    return response.status(200).json({
      message: responseEmail
    });
  }

  public async createNewPassword(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;

    const { hash } = request.params;

    const createPasswordService = container.resolve(
      CreatePasswordService,
    );

    await createPasswordService.execute({
      hash,
      password
    });

    return response.status(200).json("Senha atualizada com sucesso");
  }
  
}
