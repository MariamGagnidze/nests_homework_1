import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'Product 1',
      generalPrice: 100,
      salePrice: 80,
      inStock: true,
    },
    {
      id: 2,
      name: 'Product 2',
      generalPrice: 200,
      salePrice: 160,
      inStock: false,
    },
  ];

  constructor(private usersService: UsersService) {}

  create(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      id: lastId + 1,
      ...createProductDto,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findOne(id: number, userId: number) {
    const user = this.usersService.findOne(userId);
    const subscriptionDate = new Date(user.subscriptionDate);
    const today = new Date();

    const product = this.products.find((el) => el.id === id);
    if (!product) throw new NotFoundException('Product not found');

    return {
      id: product.id,
      name: product.name,
      inStock: product.inStock,
      price:
        subscriptionDate > today ? product.salePrice : product.generalPrice,
    };
  }

  findAll(userId: number) {
    const user = this.usersService.findOne(userId);
    const subscriptionDate = new Date(user.subscriptionDate);
    const today = new Date();

    if (subscriptionDate > today) {
      return this.products.map((product) => ({
        id: product.id,
        name: product.name,
        inStock: product.inStock,
        price: product.salePrice,
      }));
    } else {
      return this.products.map((product) => ({
        id: product.id,
        name: product.name,
        inStock: product.inStock,
        price: product.generalPrice,
      }));
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((el) => el.id === id);
    if (productIndex === -1) throw new NotFoundException('Product not found');

    const lastId = this.products[this.products.length - 1]?.id || 0;
    const updatedProduct = {
      id: lastId,
      ...updateProductDto,
    };

    this.products.push(updatedProduct);
    return updatedProduct;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) throw new NotFoundException('Product not found');

    const deletedProduct = this.products.splice(productIndex, 1);
    return deletedProduct[0];
  }
}
