import { describe, it, expect } from 'vitest';
import { validate } from 'class-validator';
import { Product } from './product.entity';

describe('Product Entity', () => {
  it('devrait créer un produit valide', async () => {
    const product = new Product();
    product.name = 'Baguette Tradition';
    product.description = 'Une baguette croustillante à la française';
    product.price = 1.20;
    product.imageUrl = 'https://example.com/baguette.jpg';
    product.isAvailable = true;

    const errors = await validate(product);
    expect(errors.length).toBe(0);
  });

  it('devrait rejeter un produit sans nom', async () => {
    const product = new Product();
    product.description = 'Une baguette croustillante à la française';
    product.price = 1.20;
    product.imageUrl = 'https://example.com/baguette.jpg';
    product.isAvailable = true;

    const errors = await validate(product);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('devrait rejeter un prix négatif', async () => {
    const product = new Product();
    product.name = 'Baguette Tradition';
    product.description = 'Une baguette croustillante à la française';
    product.price = -1.20;
    product.imageUrl = 'https://example.com/baguette.jpg';
    product.isAvailable = true;

    const errors = await validate(product);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('price');
  });

  it('devrait rejeter une URL d\'image invalide', async () => {
    const product = new Product();
    product.name = 'Baguette Tradition';
    product.description = 'Une baguette croustillante à la française';
    product.price = 1.20;
    product.imageUrl = 'invalid-url';
    product.isAvailable = true;

    const errors = await validate(product);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('imageUrl');
  });
}); 