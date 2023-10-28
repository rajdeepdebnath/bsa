import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { MultiPolygon } from "geojson";

@Entity("State")
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  map!: string;

  @Column({ type: "geometry" })
  geo_map!: MultiPolygon;
}
