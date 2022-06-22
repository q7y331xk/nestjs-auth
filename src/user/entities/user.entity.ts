import { Length, Max, MaxLength, Min } from 'class-validator';
import { Core } from 'src/shared/core.entity';
import { Column, Entity } from 'typeorm';

// change unique later
@Entity()
export class User extends Core {
  @Length(3, 20)
  @Column({ unique: true })
  name: string;

  @Length(8, 20)
  @Column()
  password: string;

  @Length(2, 15)
  @Column()
  nickname: string;

  @Length(10, 11)
  @Column()
  ph: string;

  @MaxLength(40)
  @Column()
  addr1: string;

  @MaxLength(40)
  @Column()
  addr2: string;

  @Column({ length: 100, nullable: true })
  salt: string;

  @Column({ unsigned: true, default: () => 0 })
  passwordVersion: number;

  @Column({ default: () => 0 })
  removed: number;

  @Max(10)
  @Min(0)
  @Column({ default: () => 0 })
  authType: number;
}
