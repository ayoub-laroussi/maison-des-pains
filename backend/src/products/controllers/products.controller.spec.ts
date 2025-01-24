import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: '1',
    name: 'Baguette Tradition',
    description: 'Une baguette croustillante à la française',
    price: 1.20,
    imageUrl: 'https://example.com/baguette.jpg',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductsService = {
    findAll: vi.fn().mockResolvedValue([mockProduct]),
    findOne: vi.fn().mockResolvedValue(mockProduct),
    create: vi.fn().mockResolvedValue(mockProduct),
    update: vi.fn().mockResolvedValue({ affected: 1 }),
    remove: vi.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de produits', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockProduct]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un produit par son id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('devrait créer un nouveau produit', async () => {
      const createProductDto = {
        name: 'Baguette Tradition',
        description: 'Une baguette croustillante à la française',
        price: 1.20,
        imageUrl: 'https://example.com/baguette.jpg',
      };

      const result = await controller.create(createProductDto);
      expect(result).toEqual(mockProduct);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un produit', async () => {
      const updateProductDto = {
        name: 'Baguette Tradition Updated',
      };

      const result = await controller.update('1', updateProductDto);
      expect(result).toEqual({ affected: 1 });
      expect(service.update).toHaveBeenCalledWith('1', updateProductDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un produit', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ affected: 1 });
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
}); 