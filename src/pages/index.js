import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '@/services/api';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start w-full">
                {/* Logo Section */}
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />

                {/* Product Listing Section */}
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
                        Featured Products
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div
                                key={product.id}
                                className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
                            >
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-sm text-gray-500">{product.category.name}</p>
                                <p className="text-lg font-bold">Ksh {product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer">
                    Learn
                </a>
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                    Docs
                </a>
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                    Visit Next.js →
                </a>
            </footer>
        </div>
    );
}
