import { Core } from 'src/shared/core.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PwCode extends Core {
  @ManyToOne(() => User)
  @JoinColumn()
  pwCodeUserId: number;

  @Column()
  hash: string;

  @Column()
  code: number;
}
