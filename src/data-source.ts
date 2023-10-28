import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Individual } from "./entity/individual";
import { State } from "./entity/state";

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
