import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CompaniesModule } from './companies/companies.module';
import { TaxesModule } from './taxes/taxes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    TodoListsModule,
    TodosModule,
    UsersModule,
    AuthModule,
    InvoicesModule,
    CompaniesModule,
    TaxesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
