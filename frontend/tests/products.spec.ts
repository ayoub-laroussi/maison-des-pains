import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductsPage from '../src/pages/ProductsPage';
import { productService } from '../src/services/product.service';

vi.mock('../src/services/product.service', () => ({
  productService: {
    getAllProducts: vi.fn()
  }
}));

const mockProducts = [
  {
    id: 1,
    name: 'Baguette Tradition',
    description: 'Une baguette croustillante à l\'ancienne',
    price: 1.20,
    imageURL: '/images/baguette.jpg'
  },
  {
    id: 2,
    name: 'Croissant au Beurre',
    description: 'Croissant pur beurre fait maison',
    price: 1.50,
    imageURL: '/images/croissant.jpg'
  }
];

describe('Products Page E2E Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait afficher un message de chargement puis la liste des produits', async () => {
    vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);

    render(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    );

    // Vérifie l'affichage du message de chargement
    expect(screen.getByText('Chargement...')).toBeInTheDocument();

    // Attend que les produits soient chargés
    await waitFor(() => {
      expect(screen.getByText('Baguette Tradition')).toBeInTheDocument();
      expect(screen.getByText('Croissant au Beurre')).toBeInTheDocument();
    });

    // Vérifie que le service a été appelé
    expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
  });

  it('devrait afficher un message d\'erreur en cas d\'échec de chargement', async () => {
    vi.mocked(productService.getAllProducts).mockRejectedValue(new Error('API Error'));

    render(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue lors du chargement des produits')).toBeInTheDocument();
    });
  });

  it('devrait afficher les prix correctement formatés', async () => {
    vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);

    render(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('1.20 €')).toBeInTheDocument();
      expect(screen.getByText('1.50 €')).toBeInTheDocument();
    });
  });
}); 