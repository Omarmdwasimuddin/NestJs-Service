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

<p style="text-align: justify">
প্রোভাইডার Nest-এর একটি মূল ধারণা। Nest-এর অনেক মৌলিক ক্লাস যেমন services, repositories, factories এবং helpers—এগুলোকে প্রোভাইডার হিসেবে গণ্য করা যায়। একটি প্রোভাইডারের মূল ধারণা হলো এটিকে একটি dependency হিসেবে inject করা যায়, যার মাধ্যমে বিভিন্ন অবজেক্ট একে অপরের সাথে বিভিন্ন ধরনের সম্পর্ক তৈরি করতে পারে। এই অবজেক্টগুলোকে একসাথে যুক্ত করার দায়িত্ব মূলত Nest runtime system পরিচালনা করে।
আগের অধ্যায়ে আমরা একটি সহজ CatsController তৈরি করেছি। Controllers-এর কাজ হলো HTTP request হ্যান্ডেল করা এবং আরও জটিল কাজগুলো providers-এর কাছে delegate করা। Providers হলো সাধারণ JavaScript class, যেগুলোকে একটি NestJS module-এ provider হিসেবে ঘোষণা করা হয়। আরও বিস্তারিত জানতে "Modules" অধ্যায় দেখুন।
</p>

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


## Providers 02: Dependency injection

Dependency মানে কী?

যখন একটি class কাজ করার জন্য অন্য একটি class-এর উপর নির্ভর করে, তখন সেটাকে dependency বলে।

উদাহরণ:

```bash
class CatsService {
  getCats() {
    return ["Tom", "Kitty"];
  }
}

class CatsController {
  private catsService = new CatsService();

  getAllCats() {
    return this.catsService.getCats();
  }
}
```

এখানে
CatsController → CatsService এর উপর নির্ভর করছে।

সমস্যা হলো:
Controller নিজেই new CatsService() বানাচ্ছে।

এতে সমস্যা:

Code tightly coupled হয়ে যায়

Test করা কঠিন

বড় project এ manage করা কঠিন

Dependency Injection কী?

Dependency Injection মানে হলো:

👉 যে class-এর দরকার, সেটাকে নিজে তৈরি না করে
👉 বাইরের system (NestJS) তৈরি করে
👉 constructor দিয়ে inject করে দেয়।

অর্থাৎ:

NestJS নিজেই service তৈরি করে controller-এ দিয়ে দেয়।

Example--

```bash
# service
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getCats() {
    return ["Tom", "Kitty"];
  }
}
```

@Injectable() বলছে:

➡️ এই class NestJS manage করবে।

```bash
# controller
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.getCats();
  }
}
```

এখানে কি হচ্ছে?

```bash
constructor(private catsService: CatsService)
```

মানে:

👉 NestJS নিজে CatsService বানাবে
👉 constructor দিয়ে CatsController এ inject করবে।

## Providers 03: Scopes

সাধারণত Providers-এর একটি জীবনকাল (“scope”) থাকে যা অ্যাপ্লিকেশনের lifecycle-এর সাথে সামঞ্জস্যপূর্ণ। যখন অ্যাপ্লিকেশন bootstrapped হয়, তখন প্রতিটি dependency resolve হতে হয়, অর্থাৎ প্রতিটি provider-এর instance তৈরি করা হয়। একইভাবে, যখন অ্যাপ্লিকেশন বন্ধ হয়, তখন সব provider ধ্বংস হয়ে যায়। তবে একটি provider-কে request-scoped করাও সম্ভব, যার অর্থ এর জীবনকাল অ্যাপ্লিকেশনের lifecycle-এর পরিবর্তে নির্দিষ্ট একটি request-এর সাথে সম্পর্কিত থাকে।

## Providers 04: Custom providers

Nest একটি built-in inversion of control (“IoC”) container নিয়ে আসে যা providers-এর মধ্যে সম্পর্কগুলো পরিচালনা করে। এই বৈশিষ্ট্যটি dependency injection-এর ভিত্তি, তবে এখন পর্যন্ত আমরা যতটা আলোচনা করেছি তার চেয়েও এটি অনেক বেশি শক্তিশালী। একটি provider সংজ্ঞায়িত করার জন্য কয়েকটি উপায় আছে: আপনি সাধারণ value, class, এবং asynchronous বা synchronous factory ব্যবহার করতে পারেন।

## Providers 05: Optional providers

কখনও কখনও আপনার এমন dependency থাকতে পারে যেগুলো সব সময় resolve করা প্রয়োজন হয় না। উদাহরণস্বরূপ, আপনার class একটি configuration object-এর উপর নির্ভর করতে পারে, কিন্তু যদি কোনোটি প্রদান করা না হয়, তাহলে default value ব্যবহার করা উচিত। এমন ক্ষেত্রে dependency-টিকে optional হিসেবে বিবেচনা করা হয়, এবং configuration provider না থাকলেও কোনো error হওয়া উচিত নয়।

কোনো provider-কে optional হিসেবে চিহ্নিত করতে constructor-এর signature-এ @Optional() decorator ব্যবহার করতে হয়।

```bash

import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}

```

উপরের উদাহরণে আমরা একটি custom provider ব্যবহার করছি, এজন্যই আমরা HTTP_OPTIONS custom token অন্তর্ভুক্ত করেছি। আগের উদাহরণগুলোতে constructor-ভিত্তিক injection দেখানো হয়েছে, যেখানে constructor-এর মধ্যে একটি class-এর মাধ্যমে dependency নির্দেশ করা হয়।


## Providers 06: Property-based injection

এখন পর্যন্ত আমরা যে পদ্ধতি ব্যবহার করেছি তাকে constructor-based injection বলা হয়, যেখানে constructor method-এর মাধ্যমে providers inject করা হয়। কিছু নির্দিষ্ট ক্ষেত্রে property-based injection উপকারী হতে পারে। উদাহরণস্বরূপ, যদি আপনার top-level class এক বা একাধিক provider-এর উপর নির্ভর করে, তাহলে sub-class গুলোর মধ্যে super() এর মাধ্যমে সেগুলো উপরে পর্যন্ত পাঠানো ঝামেলাপূর্ণ হয়ে যেতে পারে। এটি এড়ানোর জন্য আপনি সরাসরি property level-এ @Inject() decorator ব্যবহার করতে পারেন।

```bash

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}

```

## Providers 07: Provider registration

এখন যেহেতু আমরা একটি provider (CatsService) এবং একটি consumer (CatsController) সংজ্ঞায়িত করেছি, তাই Nest যেন injection পরিচালনা করতে পারে তার জন্য আমাদের service-টি register করতে হবে। এটি করার জন্য module ফাইল (app.module.ts) সম্পাদনা করে @Module() decorator-এর providers array-এ service-টি যোগ করতে হয়।

```bash
# app.module.ts

import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}

```

এখন Nest CatsController ক্লাসের dependency গুলো resolve করতে পারবে।

এই পর্যায়ে, আমাদের directory structure এমন হওয়া উচিত:

![](/public/Img/structureofnest.png)




## Stay in touch

- Author - [Muhammad Wasim Uddin](https://wasim-uddin-portfolio.vercel.app/)
- Website - [@portfolio](https://wasim-uddin-portfolio.vercel.app/)
- Linkedin - [@mwasimuddin/](https://www.linkedin.com/in/mwasimuddin/)