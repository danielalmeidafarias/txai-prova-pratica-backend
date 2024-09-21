import {
  Inject,
  Injectable,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  owner_id: string;
  image_url?: string;
}

@Injectable()
export class ProductsRepository {
  constructor(@Inject() private prismaService: PrismaService) {}

  async create({
    name,
    description,
    owner_id,
    price,
    image_url,
  }: ICreateProduct) {
    try {
      const product = await this.prismaService.product.create({
        data: {
          name,
          description,
          price,
          owner_id,
          image_url,
        },
      });

      return {
        message: 'Product successfully created!',
        product,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            throw new ConflictException(
              'Product with this name already exists.',
            );
          case 'P2003':
            throw new BadRequestException(
              'Invalid ownerId. Foreign key constraint failed.',
            );
          case 'P2025':
            throw new NotFoundException(
              'The operation failed because a required record was not found.',
            );
          default:
            break;
        }
      }
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }

  async update(product_id: string, updateData: Partial<ICreateProduct>) {
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: { id: product_id },
        data: updateData,
      });

      return {
        message: 'Product successfully updated!',
        updatedProduct,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            throw new ConflictException(
              'Product with this name already exists.',
            );
          case 'P2003':
            throw new BadRequestException('Foreign key constraint failed.');
          case 'P2025':
            throw new NotFoundException('Product not found.');
          default:
            break;
        }
      }
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }

  async delete(id: string) {
    try {
      const deletedProduct = await this.prismaService.product.delete({
        where: { id },
      });

      return {
        message: 'Product successfully deleted!',
        deletedProduct,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException('Product not found.');
        }
      }
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }

  async get_one_by_id(id: string) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Product not found.');
      }

      return product;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }

  async get_all() {
    try {
      const products = await this.prismaService.product.findMany();
      return products;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred while fetching products.',
      );
    }
  }

  async get_some_by_owner_id(ownerId: string) {
    try {
      const products = await this.prismaService.product.findMany({
        where: { ownerId },
      });

      return products;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }

  async getByDescription(description: string) {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          description: {
            contains: description,
          },
        },
      });

      return products;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }

  async getByPriceRange(minPrice: number, maxPrice: number) {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      });

      return products;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }
}
