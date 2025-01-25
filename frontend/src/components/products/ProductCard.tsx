import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../services/product.service';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { id, name, description, price, imageURL } = product;

  return (
    <Link to={`/products/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {imageURL && (
          <div className="relative h-48">
            <img
              src={imageURL}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">
              {price.toFixed(2)} €
            </span>
            <button
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Ajouter au panier
              }}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 