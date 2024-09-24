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
import { SearchProductDto } from './dto/search-product.dto';

interface ICreateProduct {
  name: string;
  description: string;
  quantity?: number;
  price: number;
  owner_id: string;
  image_url?: string;
}

interface IUpdateProduct {
  data: Partial<ICreateProduct>;
  product_id: string;
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
    quantity,
  }: ICreateProduct) {
    try {
      const product = await this.prismaService.product.create({
        data: {
          name,
          description,
          quantity,
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

  async update({ data, product_id }: IUpdateProduct) {
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: { id: product_id },
        data,
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

  get_products_search_query({
    description,
    max_price,
    min_price,
    name,
    owner_id,
  }: SearchProductDto) {
    const filters: Prisma.ProductWhereInput = {};

    if (owner_id) {
      filters.owner_id = owner_id;
    }

    if (name) {
      filters.OR = [
        {
          name: {
            contains: name,
          },
        },
        {
          name: {
            contains: name.toLowerCase(),
          },
        },
        {
          name: {
            contains: name.toUpperCase(),
          },
        },
      ];
    }

    if (min_price || max_price) {
      filters.price = {
        ...(Number(min_price) && { gte: Number(min_price) }),
        ...(Number(max_price) && { lte: Number(max_price) }),
      };
    }

    if (description) {
      filters.OR = [
        {
          description: {
            contains: description,
          },
        },
        {
          description: {
            contains: description.toLowerCase(),
          },
        },
        {
          description: {
            contains: description.toUpperCase(),
          },
        },
      ];
    }

    return filters;
  }

  async search_product(search_filters: SearchProductDto) {
    const products = await this.prismaService.product.findMany({
      where: this.get_products_search_query(search_filters),
    });

    return products;
  }
}
