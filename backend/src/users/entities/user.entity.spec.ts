import { describe, it, expect } from 'vitest';
import { User, UserRole } from './user.entity';
import { validate } from 'class-validator';

describe('User Entity', () => {
  it('devrait créer un utilisateur valide', async () => {
    const user = new User();
    user.email = 'test@example.com';
    user.password = 'Password123!';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.role = UserRole.CLIENT;

    const errors = await validate(user);
    expect(errors.length).toBe(0);
  });

  it('devrait rejeter un email invalide', async () => {
    const user = new User();
    user.email = 'invalid-email';
    user.password = 'Password123!';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.role = UserRole.CLIENT;

    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('devrait avoir le rôle CLIENT par défaut', () => {
    const user = new User();
    expect(user.role).toBe(UserRole.CLIENT);
  });
}); 