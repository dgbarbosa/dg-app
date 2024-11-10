import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, TodosModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
