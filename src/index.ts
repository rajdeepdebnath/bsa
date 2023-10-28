import express, { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { myDataSource } from "./data-source";
import { User } from "./entity/user";
import { Individual } from "./entity/individual";
import { State } from "./entity/state";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3005;

app.get("/process-individual", async (req: Request, res: Response) => {
  const readableStream = fs.createReadStream(
    path.join(__dirname, "../data/ind.csv"),
    "utf8"
  );

  readableStream.on("error", function (error) {
    console.log(`error: ${error.message}`);
    res.send(`error: ${error.message}`);
  });

  readableStream.on("data", async (chunk: string) => {
    console.log(chunk);
    if (chunk) {
      let chunkarr = chunk.split("\r\n");
      for (let chunkitem of chunkarr) {
        console.log(chunkitem);
        let strarr = chunkitem.split(",");
        console.log(strarr.length);
        if (strarr.length >= 3) {
          let ind = myDataSource.getRepository(Individual).create();
          ind.firstname = strarr[0];
          ind.lastname = strarr[1];
          ind.location = strarr.slice(2).join(",");
          ind.geo_location = JSON.parse(ind.location).geometry;
          await myDataSource.getRepository(Individual).save(ind);
        }
      }
    }
    console.log("done");
    res.send(`done!`);
  });
});

app.get("/process-states", async (req: Request, res: Response) => {
  let fullPath = path.join(__dirname, "../data/states");
  fs.readdir(fullPath, (error, files) => {
    if (error) {
      res.send(error);
      return;
    }

    function* getFileSequentially() {
      for (let file of files) {
        yield file;
      }
    }

    let file_gen_fn = getFileSequentially();
    let file_gen_obj = file_gen_fn.next();
    if (!file_gen_obj.done) {
      console.log(file_gen_obj);
      processStateData(file_gen_obj.value);
    }

    function processStateData(file: string) {
      let state_data = "";
      const readableStream = fs.createReadStream(
        path.join(__dirname, "../data/states", file),
        "utf8"
      );

      readableStream.on("error", function (error) {
        console.log(`error: ${error.message}`);
        res.send(`error: ${error.message}`);
      });

      readableStream.on("data", async (chunk: string) => {
        state_data += chunk;
      });

      readableStream.on("end", async () => {
        console.log(file);
        if (state_data) {
          let obj = JSON.parse(state_data);
          let ind = myDataSource.getRepository(State).create();
          ind.name = file.replace(".geojson", "");
          ind.map = obj.features[0];
          ind.geo_map = obj.features[0].geometry;
          await myDataSource.getRepository(State).save(ind);

          file_gen_obj = file_gen_fn.next();
          if (!file_gen_obj.done) {
            console.log(file_gen_obj);
            processStateData(file_gen_obj.value);
          }
        }
      });
    }

    res.send(`done!`);
  });
});

app.get("/data", async (req: Request, res: Response) => {
  const users = await myDataSource.getRepository(User).findBy({ id: 1 });
  console.log(users);

  res.json(users);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server 1");
});

app.listen(port, async () => {
  try {
    await myDataSource.initialize();

    console.log("Data Source has been initialized!");
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
});
