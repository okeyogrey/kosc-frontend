import { useEffect, useState } from 'react';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading products...</p>;
    }

    return (
        <div className="product-grid">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <p className="text-center text-gray-500">No products available.</p>
            )}
        </div>
    );
};

export default ProductsPage;
