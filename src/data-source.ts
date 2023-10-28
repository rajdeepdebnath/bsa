import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entity/user";
import { Individual } from "./entity/individual";
import { State } from "./entity/state";

dotenv.config();

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.RDS_DB,
  port: 5432,
  username: "bsaadmin",
  password: "bsa1234567",
  database: "postgres",
  entities: [User, Individual, State],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
