import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Request } from 'express';
import { SearchProductDto } from './dto/search-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(@Inject() private productsRepository: ProductsRepository) {}
  async create(
    { name, price, description, quantity }: CreateProductDto,
    req: Request,
  ) {
    try {
      const product = await this.productsRepository.create({
        description,
        name,
        price,
        quantity,
        owner_id: req['user'].id,
      });

      return {
        message: 'Product Successfully created!',
        product,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async search(search_product_dto: SearchProductDto) {
    try {
      const products =
        await this.productsRepository.search_product(search_product_dto);
      if (products.length == 0) {
        return {
          message: 'No product found with this filters',
        };
      } else {
        return products;
      }
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productsRepository.get_one_by_id(id);
      return product;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException({
            message: `There is no registered product with ${id} id`,
          });
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    { description, name, price, quantity }: UpdateProductDto,
  ) {
    try {
      const updatedUser = await this.productsRepository.update({
        product_id: id,
        data: {
          description,
          name,
          price,
          quantity,
        },
      });
      return {
        message: 'Product updated successfully',
        user: updatedUser,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(err.message);
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      await this.productsRepository.delete(id);
      return { message: `Product with ID ${id} deleted successfully` };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2001') {
          throw new BadRequestException({
            message: `There is no registered product with ${id} id`,
          });
        } else if (err.code === 'P2014') {
          throw new BadRequestException(err.message);
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
