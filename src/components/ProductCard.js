import Image from 'next/image';

const ProductCard = ({ product }) => {
    const imageUrl = product.image.startsWith('/')
        ? `http://localhost:8000${product.image}`
        : product.image;

    return (
        <div className="border rounded-2xl shadow-lg p-4 bg-white hover:shadow-2xl transition-shadow">
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
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
