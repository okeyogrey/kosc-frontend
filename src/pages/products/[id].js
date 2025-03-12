import axiosInstance from '@/services/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReviewCard from '@/components/ReviewCard';

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            axiosInstance.get(`/products/${id}/`)
                .then((response) => {
                    console.log('API Response:', response.data);
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching product:', err);
                    setError('Failed to load product details.');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/2 h-64">
                        <Image 
                            src={product.image.startsWith('http') ? product.image : `http://localhost:8000${product.image}`} 
                            alt={product.name} 
                            width={500}
                            height={500}
                            className="rounded-lg"
                        />
                    </div>

                    <div className="md:w-1/2 md:pl-6">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-600 text-lg mb-2">Price: Ksh {product.price.toLocaleString()}</p>
                        <p className="text-gray-700">{product.description}</p>

                        <button
                            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="grid gap-4">
                            {product.reviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>

                {/* Related Products Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {product.related_products && product.related_products.map(related => (
                            <div key={related.id} className="border rounded-lg p-2 shadow-md">
                                <Image 
                                    src={related.image.startsWith('http') ? related.image : `http://localhost:8000${related.image}`} 
                                    alt={related.name} 
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-lg font-bold mt-2">{related.name}</h3>
                                <p className="text-gray-500">Ksh {related.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
