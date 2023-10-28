import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("State")
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  map!: string;
}
