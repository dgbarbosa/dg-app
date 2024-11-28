import { UserEntity } from '@entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto, getUserSchema } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  async create(createUser: CreateUserDto): Promise<GetUserDto> {
    const existentUser = await this.repository.findOne({
      where: {
        email: createUser.email,
      },
    });

    if (existentUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    const user = await this.repository.create(createUser);

    user.password = hashedPassword;

    const createdUser = await this.repository.save(user);
    return getUserSchema.parse(createdUser);
  }

  async findAll(): Promise<GetUserDto[]> {
    return await this.repository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(
    userId: number,
    options: FindOneOptions<UserEntity> = {},
  ): Promise<GetUserDto> {
    const user = await this.repository.findOne({
      ...options,
      where: {
        ...(options?.where || {}),
        id: userId,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<GetUserDto> {
    await this.repository.update(id, updateUser);

    const updatedUser = await this.repository.findOne({
      where: {
        id,
      },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });

    if (updatedUser) {
      return updatedUser;
    }

    throw new NotFoundException();
  }

  async remove(id: number): Promise<void> {
    const deletedUser = await this.repository.delete({
      id,
    });

    if (deletedUser.affected === 0) {
      throw new NotFoundException();
    }
  }
}
