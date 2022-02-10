import { Controller } from '@nestjs/common';

import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { TodosService } from './todos.service';

@Controller('/todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService
  ) {}

  @Get()
  public findAll(): Promise<TodoEntity[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<TodoEntity> {
    return this.todosService.findOne(id);
  }

  @Post()
  public create(@Body() todo: CreateTodoDto): Promise<TodoEntity> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<TodoEntity> {
    return this.todosService.delete(id);
  }
}
