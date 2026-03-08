import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CatsController],
  providers: [AppService, ProductService, CatsService],
})
export class AppModule {}
