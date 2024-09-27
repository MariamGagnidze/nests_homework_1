import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Admin } from 'src/users/admin.guard';

@Controller('products')
export class ProductsController {
  

  constructor(private productsService: ProductsService) {}

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.productsService.findAll(+userId);
  }

  @Get(':id/:userId')
  findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return this.productsService.findOne(+id, +userId);
  }

  @Post()
  @UseGuards(Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
