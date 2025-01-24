import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = {
      getHello: vi.fn().mockReturnValue('Hello World!')
    } as AppService;
    appController = new AppController(appService);
  });

  describe('root', () => {
    it('devrait retourner "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
      expect(appService.getHello).toHaveBeenCalled();
    });
  });
});
