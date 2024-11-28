import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {
  CreateCompanyDto,
  createCompanySchema,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from '@decorators';
import { ZodValidationPipe } from '@common/pipes';
import { CompanyDto } from './dto/company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createCompanySchema))
    createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyDto> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll(@User() user: User): Promise<CompanyDto[]> {
    return this.companiesService.findAll(user.id);
  }

  @Get(':id')
  findOne(
    @User() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ): any {
    return this.companiesService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @User() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): any {
    return this.companiesService.update(id, user.id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@User() user: User, @Param('id', new ParseIntPipe()) id: number): any {
    return this.companiesService.remove(id, user.id);
  }
}
