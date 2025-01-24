import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

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

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: vi.fn().mockResolvedValue([mockProduct]),
            findOne: vi.fn().mockResolvedValue(mockProduct),
            create: vi.fn().mockReturnValue(mockProduct),
            save: vi.fn().mockResolvedValue(mockProduct),
            update: vi.fn().mockResolvedValue({ affected: 1 }),
            delete: vi.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de produits', async () => {
      const products = await service.findAll();
      expect(products).toEqual([mockProduct]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un produit par son id', async () => {
      const product = await service.findOne('1');
      expect(product).toEqual(mockProduct);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
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

      const product = await service.create(createProductDto);
      expect(product).toEqual(mockProduct);
      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un produit', async () => {
      const updateProductDto = {
        name: 'Baguette Tradition Updated',
      };

      const result = await service.update('1', updateProductDto);
      expect(result).toEqual({ affected: 1 });
      expect(repository.update).toHaveBeenCalledWith('1', updateProductDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un produit', async () => {
      const result = await service.remove('1');
      expect(result).toEqual({ affected: 1 });
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
}); 