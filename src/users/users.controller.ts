import { ZodValidationPipe } from '@common/pipes';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Public } from '@decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(
    @Body(new ZodValidationPipe(createUserSchema))
    createUser: CreateUserDto,
  ): Promise<GetUserDto> {
    return await this.usersService.create(createUser);
  }

  @Get()
  async findAll(): Promise<GetUserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetUserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema))
    updateUser: UpdateUserDto,
  ): Promise<GetUserDto> {
    return this.usersService.update(id, updateUser);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
