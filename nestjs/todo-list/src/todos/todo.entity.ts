import { Entity } from 'typeorm';

import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn({
    name: 'todo_id'
  })
  id: string;

  @Column({
    nullable: false
  })
  description: string;

  @Column({
    nullable: false,
    default: false
  })
  done: boolean;
}
