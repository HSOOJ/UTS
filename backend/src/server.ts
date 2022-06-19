/* eslint-disable @typescript-eslint/no-unsafe-call */
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

import apiRouter from "./routes/api";
import logger from "jet-logger";
import { CustomError } from "@shared/errors";

import cors from "cors";
import http from "http";

import swaggerUi from "swagger-ui-express";
const swaggerFile = require("./swagger/swagger-output.json");

// Constants
const app = express();

//Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
);

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors(CorsOptions))

// CORS
const allowedOrigins = [
  "*",
  "http://uts_url:3000",
  "http://localhost:3000",
  "http://localhost:80",
  "http://uts_url:80",
  "http://uts_url",
];
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: allowedOrigins,
  preflightContinue: false,
};

app.use(cors(options));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use("/api", apiRouter);

// Error handling
app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      error: err.message,
    });
  }
);

/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/

// Set views dir
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static dir
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Serve index.html file
app.get("*", (_: Request, res: Response) => {
  res.sendFile("index.html", { root: viewsDir });
});

// Export here and start in a diff file (for testing).
export default app;
