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




## Stay in touch

- Author - [Muhammad Wasim Uddin](https://wasim-uddin-portfolio.vercel.app/)
- Website - [@portfolio](https://wasim-uddin-portfolio.vercel.app/)
- Linkedin - [@mwasimuddin/](https://www.linkedin.com/in/mwasimuddin/)