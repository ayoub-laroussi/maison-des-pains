import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { ImageService } from './image.service';
import { promises as fs } from 'fs';
import { join } from 'path';

vi.mock('fs', () => ({
  promises: {
    access: vi.fn(),
    mkdir: vi.fn(),
    writeFile: vi.fn(),
    unlink: vi.fn(),
    stat: vi.fn(),
  },
}));

vi.mock('uuid', () => ({
  v4: () => 'test-uuid',
}));

describe('ImageService', () => {
  let imageService: ImageService;
  let configService: ConfigService;

  beforeEach(() => {
    vi.clearAllMocks();
    
    configService = {
      get: vi.fn().mockReturnValue('test-uploads'),
    } as unknown as ConfigService;

    imageService = new ImageService(configService);
  });

  describe('uploadImage', () => {
    const mockFile = {
      originalname: 'test.jpg',
      mimetype: 'image/jpeg',
      size: 1024 * 1024, // 1MB
      buffer: Buffer.from('test'),
    } as Express.Multer.File;

    it('devrait uploader une image valide avec succès', async () => {
      const result = await imageService.uploadImage(mockFile);

      expect(result).toBe('/products/images/test-uuid.jpg');
      expect(fs.writeFile).toHaveBeenCalledWith(
        join('test-uploads', 'test-uuid.jpg'),
        mockFile.buffer,
      );
    });

    it('devrait rejeter un fichier non-image', async () => {
      const invalidFile = { ...mockFile, mimetype: 'application/pdf' };

      await expect(imageService.uploadImage(invalidFile)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('devrait rejeter un fichier trop volumineux', async () => {
      const largeFile = { ...mockFile, size: 6 * 1024 * 1024 }; // 6MB

      await expect(imageService.uploadImage(largeFile)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('deleteImage', () => {
    it('devrait supprimer une image existante', async () => {
      vi.mocked(fs.stat).mockResolvedValueOnce({} as any);
      
      await imageService.deleteImage('/products/images/test.jpg');

      expect(fs.unlink).toHaveBeenCalledWith(join('test-uploads', 'test.jpg'));
    });

    it('ne devrait pas échouer si l\'image n\'existe pas', async () => {
      vi.mocked(fs.stat).mockRejectedValueOnce(new Error());

      await expect(imageService.deleteImage('/products/images/test.jpg')).resolves.not.toThrow();
      expect(fs.unlink).not.toHaveBeenCalled();
    });

    it('ne devrait rien faire si l\'URL est vide', async () => {
      await imageService.deleteImage('');

      expect(fs.stat).not.toHaveBeenCalled();
      expect(fs.unlink).not.toHaveBeenCalled();
    });
  });
}); 