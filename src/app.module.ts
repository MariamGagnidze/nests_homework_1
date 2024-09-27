import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [PostsModule, UsersModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
