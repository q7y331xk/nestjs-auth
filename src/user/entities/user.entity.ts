import { Length } from "class-validator";
import { Core } from "src/shared/core.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends Core {
  @Length(3, 20)
  @Column()
  name: string;

  @Length(8, 20)
  @Column()
  password: string;
}