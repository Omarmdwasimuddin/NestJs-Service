<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


## Description

[NestJs Service](https://docs.nestjs.com/providers) tutorial repository.

## Service

```bash
$ nest g service [name]

# or,

$ nest g s [name]
```

```bash
# create service
$ nest g service product
```

![product](/public/Img/product.png)

```bash
# product.service.ts 
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        {id: 1, name:"Mobile", price: 15000},
        {id: 2, name:"Laptop", price: 55000},
        {id: 3, name:"Headphone", price: 2000},
        {id: 4, name:"Keyboard", price: 1200},
        {id: 5, name:"Mouse", price: 800},
        {id: 6, name:"Smart Watch", price: 3500}
    ];
    getAllProducts(){
        return this.products;
    }

    getProductById(id: number){
        return this.products.find((product) => product.id === id)
    }
}
```

![product](/public/Img/productcontroller.png)

```bash
# product.controller.ts 
import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts(){
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getproduct(@Param('id') id: string){
        return this.productService.getProductById(Number(id));
    }
}
```

#### Output View

![](/public/Img/output1.png)
![](/public/Img/output2.png)

## Provider

প্রোভাইডার Nest-এর একটি মূল ধারণা। Nest-এর অনেক মৌলিক ক্লাস যেমন services, repositories, factories এবং helpers—এগুলোকে প্রোভাইডার হিসেবে গণ্য করা যায়। একটি প্রোভাইডারের মূল ধারণা হলো এটিকে একটি dependency হিসেবে inject করা যায়, যার মাধ্যমে বিভিন্ন অবজেক্ট একে অপরের সাথে বিভিন্ন ধরনের সম্পর্ক তৈরি করতে পারে। এই অবজেক্টগুলোকে একসাথে যুক্ত করার দায়িত্ব মূলত Nest runtime system পরিচালনা করে।
আগের অধ্যায়ে আমরা একটি সহজ CatsController তৈরি করেছি। Controllers-এর কাজ হলো HTTP request হ্যান্ডেল করা এবং আরও জটিল কাজগুলো providers-এর কাছে delegate করা। Providers হলো সাধারণ JavaScript class, যেগুলোকে একটি NestJS module-এ provider হিসেবে ঘোষণা করা হয়। আরও বিস্তারিত জানতে "Modules" অধ্যায় দেখুন।


## Providers 01: Services

```bash
$ nest g service cats
$ nest g controller cats
```
---

#### create koro- dto/create-cat.dto & interfaces/cat.interface.ts
![](/public/Img/dto.png)

```bash
# cat.interface.ts
export interface Cat {
    name: string;
    age: number;
    breed: string;
}
```
---

```bash
# create-cat.dto.ts
export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}
```
---

```bash
# cats.service.ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
```
---

```bash
# cats.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]>{
        return this.catsService.findAll();
    }
}
```
---

#### Output view
![](/public/Img/cats.png)
![](/public/Img/catsget.png)




## Stay in touch

- Author - [Muhammad Wasim Uddin](https://wasim-uddin-portfolio.vercel.app/)
- Website - [@portfolio](https://wasim-uddin-portfolio.vercel.app/)
- Linkedin - [@mwasimuddin/](https://www.linkedin.com/in/mwasimuddin/)