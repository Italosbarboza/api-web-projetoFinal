import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import "express-async-errors";
import cors from "cors";

import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import routes from "./routes";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(5000, () => {
  console.log("🚀 Server started on port 5000!");
});
