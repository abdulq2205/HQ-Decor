"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group relative flex flex-col space-y-2 cursor-pointer">
            {/* Image Container */}
            <div className="aspect-[11/12] relative overflow-hidden bg-gray-100">
                {/* Image Placeholder / Next.Image */}
                <div className="w-full h-full bg-neutral-200 group-hover:bg-neutral-300 transition-colors duration-500" />

                {/* Optional: We can add the image back if we have the prop */}
                {/* <Image 
                    src={product.image || '/placeholder.jpg'} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                /> */}

                {/* Add to Cart Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#E8E0E0] py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="text-xs font-bold uppercase tracking-widest text-[#4A3427] w-full h-full"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Details */}
            <Link href={`/product/${product.id}`} className="block space-y-1 mt-2 text-left">
                <h3 className="font-bold uppercase tracking-wider text-sm text-black">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 tracking-wide">
                    From ${product.price} USD
                </p>
            </Link>
        </div>
    );
}
