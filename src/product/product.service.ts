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