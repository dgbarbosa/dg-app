import { CompanyEntity } from '@entities/company.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDto, companySchema } from './dto/company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private repository: Repository<CompanyEntity>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyDto> {
    const createdCompany = await this.repository.save(createCompanyDto);

    return companySchema.parse(createdCompany);
  }

  findAll(userId: number): any {
    const companies = this.repository.find({ where: { user: { id: userId } } });

    return companySchema.array().parse(companies);
  }

  async findOne(id: number, userId: number): Promise<CompanyDto> {
    const company = await this.repository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return companySchema.parse(company);
  }

  async update(
    id: number,
    userId: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDto> {
    await this.repository.update(
      {
        id,
        user: {
          id: userId,
        },
      },
      updateCompanyDto,
    );

    const company = await this.repository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return companySchema.parse(company);
  }

  async remove(id: number, userId: number): Promise<void> {
    const result = await this.repository.delete({
      id,
      user: {
        id: userId,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
