import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { join } from 'path';
import { promises as fs } from 'fs';
import { ImageModule } from '../src/products/image.module';
import { AuthModule } from '../src/auth/auth.module';
import { Role } from '../src/auth/enums/role.enum';

describe('ImageController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  const testUploadDir = 'test-uploads/products';

  beforeEach(async () => {
    // Créer le répertoire de test
    await fs.mkdir(testUploadDir, { recursive: true });

    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => ({ UPLOAD_DIR: testUploadDir })],
        }),
        ImageModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Obtenir un token d'authentification pour les tests
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      });

    authToken = loginResponse.body.data.accessToken;
  });

  afterEach(async () => {
    // Nettoyer le répertoire de test
    await fs.rm(testUploadDir, { recursive: true, force: true });
    await app.close();
  });

  describe('/products/images (POST)', () => {
    it('devrait uploader une image avec succès', async () => {
      const response = await request(app.getHttpServer())
        .post('/products/images')
        .attach('image', join(__dirname, 'fixtures/test-image.jpg'))
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Image uploadée avec succès');
      expect(response.body.data.imageUrl).toMatch(/^\/products\/images\/.+\.jpg$/);
    });

    it('devrait rejeter un fichier non autorisé', async () => {
      const response = await request(app.getHttpServer())
        .post('/products/images')
        .attach('image', join(__dirname, 'fixtures/test-file.pdf'))
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(400);
    });

    it('devrait rejeter une requête sans authentification', async () => {
      const response = await request(app.getHttpServer())
        .post('/products/images')
        .attach('image', join(__dirname, 'fixtures/test-image.jpg'));

      expect(response.status).toBe(401);
    });
  });

  describe('/products/images/:filename (DELETE)', () => {
    it('devrait supprimer une image avec succès', async () => {
      // D'abord uploader une image
      const uploadResponse = await request(app.getHttpServer())
        .post('/products/images')
        .attach('image', join(__dirname, 'fixtures/test-image.jpg'))
        .set('Authorization', `Bearer ${authToken}`);

      const imageUrl = uploadResponse.body.data.imageUrl;
      const filename = imageUrl.split('/').pop();

      // Ensuite la supprimer
      const deleteResponse = await request(app.getHttpServer())
        .delete(`/products/images/${filename}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.message).toBe('Image supprimée avec succès');
    });

    it('devrait rejeter une suppression sans authentification', async () => {
      const response = await request(app.getHttpServer())
        .delete('/products/images/test.jpg');

      expect(response.status).toBe(401);
    });
  });
}); 