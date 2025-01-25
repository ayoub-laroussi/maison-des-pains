import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ConfigService } from '@nestjs/config';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    productsService = {
      findAll: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    } as unknown as ProductsService;

    controller = new ProductsController(productsService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de produits', async () => {
      const result = [
        { id: 1, name: 'Baguette', price: 1.20 },
        { id: 2, name: 'Croissant', price: 1.50 },
      ];
      vi.mocked(productsService.findAll).mockResolvedValue(result);

      const products = await controller.findAll();
      expect(products).toBe(result);
      expect(productsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un produit par son id', async () => {
      const result = { id: 1, name: 'Baguette', price: 1.20 };
      vi.mocked(productsService.findOne).mockResolvedValue(result);

      const product = await controller.findOne('1');
      expect(product).toBe(result);
      expect(productsService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('devrait créer un nouveau produit', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Baguette',
        description: 'Baguette traditionnelle',
        price: 1.20,
      };
      const result = { id: 1, ...createProductDto };
      vi.mocked(productsService.create).mockResolvedValue(result);

      const product = await controller.create(createProductDto);
      expect(product).toBe(result);
      expect(productsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un produit', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Baguette Tradition',
        price: 1.30,
      };
      const result = { id: 1, ...updateProductDto };
      vi.mocked(productsService.update).mockResolvedValue(result);

      const product = await controller.update('1', updateProductDto);
      expect(product).toBe(result);
      expect(productsService.update).toHaveBeenCalledWith('1', updateProductDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un produit', async () => {
      const result = { id: 1, name: 'Baguette', price: 1.20 };
      vi.mocked(productsService.remove).mockResolvedValue(result);

      const product = await controller.remove('1');
      expect(product).toBe(result);
      expect(productsService.remove).toHaveBeenCalledWith('1');
    });
  });
}); 