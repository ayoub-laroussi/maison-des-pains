import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserRole } from '../src/users/entities/user.entity';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let clientToken: string;
  let productId: string;

  const mockProduct = {
    name: 'Baguette Tradition',
    description: 'Une baguette traditionnelle croustillante',
    price: 1.20,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Créer un utilisateur admin
    const adminResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'admin@test.com',
        password: 'Admin123!',
        firstName: 'Admin',
        lastName: 'Test',
        role: UserRole.ADMIN,
      });

    // Connexion admin
    const adminLoginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Admin123!',
      });

    adminToken = adminLoginResponse.body.access_token;

    // Créer un utilisateur client
    const clientResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'client@test.com',
        password: 'Client123!',
        firstName: 'Client',
        lastName: 'Test',
        role: UserRole.CLIENT,
      });

    // Connexion client
    const clientLoginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'client@test.com',
        password: 'Client123!',
      });

    clientToken = clientLoginResponse.body.access_token;

    // Créer un produit pour les tests
    const createProductResponse = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(mockProduct);

    productId = createProductResponse.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /products', () => {
    it('should create a product when user is admin', () => {
      return request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockProduct)
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(mockProduct.name);
        });
    });

    it('should not create a product when user is client', () => {
      return request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(mockProduct)
        .expect(403);
    });
  });

  describe('GET /products', () => {
    it('should return all products without authentication', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('GET /products/:id', () => {
    it('should return a product by id without authentication', () => {
      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200)
        .expect(res => {
          expect(res.body.id).toBe(productId);
          expect(res.body.name).toBe(mockProduct.name);
        });
    });

    it('should return 404 when product does not exist', () => {
      return request(app.getHttpServer())
        .get('/products/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });

  describe('PATCH /products/:id', () => {
    const updateDto = { name: 'Baguette Tradition Updated' };

    it('should update a product when user is admin', () => {
      return request(app.getHttpServer())
        .patch(`/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(200)
        .expect(res => {
          expect(res.body.name).toBe(updateDto.name);
        });
    });

    it('should not update a product when user is client', () => {
      return request(app.getHttpServer())
        .patch(`/products/${productId}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(updateDto)
        .expect(403);
    });
  });

  describe('DELETE /products/:id', () => {
    it('should not delete a product when user is client', () => {
      return request(app.getHttpServer())
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(403);
    });

    it('should soft delete a product when user is admin', () => {
      return request(app.getHttpServer())
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });

    it('should not find the deleted product', () => {
      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(404);
    });
  });
}); 