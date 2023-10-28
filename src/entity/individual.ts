import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "geojson";

@Entity("Individual")
export class Individual {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ nullable: true })
  state_id!: number;

  @Column()
  location!: string;

  @Column("geometry")
  geo_location!: Point;
}
