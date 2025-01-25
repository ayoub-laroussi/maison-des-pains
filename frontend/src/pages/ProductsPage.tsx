import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Nos Produits Artisanaux
      </h1>
      <div className="max-w-7xl mx-auto">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage; 