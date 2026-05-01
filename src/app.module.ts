import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PizzasModule } from './pizzas/pizzas.module';

@Module({
  imports: [PizzasModule],
  controllers: [AppController],
})
export class AppModule {}
