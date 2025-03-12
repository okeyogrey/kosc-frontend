import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    const imageUrl = product.image.startsWith('/')
        ? `http://localhost:8000${product.image}`
        : product.image;

    return (
        <Link href={`/products/${product.id}`}>
            <div className="border rounded-2xl shadow-lg p-4 bg-white hover:shadow-2xl transition-shadow cursor-pointer">
                <div className="relative w-full h-48">
                    <Image
                        src={imageUrl || '/placeholder-image.jpg'}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl"
                    />
                </div>

                <div className="p-2">
                    <h3 className="text-lg font-bold truncate">{product.name}</h3>
                    <p className="text-gray-600">Ksh {product.price.toLocaleString()}</p>

                    <button
                        className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;