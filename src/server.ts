import express from "express";
import { errorHandler } from "./infrastructure/middlewares/errorMiddleware";
import dotenv from "dotenv";
import SwaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";
import { router } from "./infrastructure/routes/UserRoutes";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDoc));

dotenv.config();

app.use(router);

app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`server running on port ${port}`);
});
