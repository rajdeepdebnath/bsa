import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import { myDataSource } from "./data-source";
import swaggerUi from "swagger-ui-express";
import apiRouter from "./routes/api-router";
import processDataRouter from "./routes/process-data-router";
import { swaggerDocs } from "./swaggerDocs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", apiRouter);

app.use("/process", processDataRouter);

app.post("/auth", (req: Request, res: Response) => {
  let { username, password } = req.body;

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    //jwt token
    res.send("");
    return;
  }

  res.send("Express + TypeScript Server 1");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server 1");
});

if (process.env.ENVIRONMENT !== "production") {
  app.listen(port, async () => {
    try {
      await myDataSource.initialize();

      console.log("Data Source has been initialized!");
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    } catch (error) {
      console.error("Error during Data Source initialization:", error);
    }
  });
} else {
  myDataSource
    .initialize()
    .then((dataSource) => console.log("Data Source has been initialized!"));
}

export { app };
