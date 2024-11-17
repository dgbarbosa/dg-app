import { User } from '@entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async create({
    createUserDto,
  }: {
    createUserDto: CreateUserDto;
  }): Promise<GetUserDto> {
    const user = await this.repository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...createdUser } = await this.repository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser;
  }

  async findAll(): Promise<GetUserDto[]> {
    return await this.repository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(userId: number): Promise<GetUserDto> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    await this.repository.update(id, updateUserDto);

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
