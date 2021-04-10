import { container } from "tsyringe";

import "@modules/users/providers";
import "./providers";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IUsersTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import UsersTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

import ITreinosRepository from "@modules/exercises/repositories/ITreinoRepository";
import TreinosRepository from "@modules/exercises/infra/typeorm/repositories/TreinosRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UserTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<ITreinosRepository>(
  "TreinoRepository",
  TreinosRepository,
);


