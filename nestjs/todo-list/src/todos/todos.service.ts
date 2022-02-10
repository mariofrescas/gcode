import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private todosRepository: Repository<TodoEntity>
  ) {}

  public findAll(): Promise<TodoEntity[]> {
    return this.todosRepository.find();
  }

  public findOne(id: string): Promise<TodoEntity> {
    return this.todosRepository.findOne(id);
  }

  public create(todo: CreateTodoDto): Promise<TodoEntity> {
    const created = this.todosRepository.create(todo);
    return this.todosRepository.save(created);
  }

  public async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.todosRepository.update(id, updateTodoDto);
    return this.todosRepository.findOne(id);
  }

  public async delete(id: string): Promise<TodoEntity> {
    const deleted = await this.todosRepository.findOne(id);
    await this.todosRepository.delete(id);
    return deleted;
  }
}
