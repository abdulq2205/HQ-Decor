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
        <div className="group relative flex flex-col space-y-3">
            {/* Image Container */}
            <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 rounder-sm">
                {/* Placeholder or Actual Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50">
                    {/* Fallback if no image */}
                    <span className="sr-only">{product.name}</span>
                    {/* In a real app, use next/image here */}
                    <div className="w-full h-full bg-neutral-200 group-hover:bg-neutral-300 transition-colors duration-500" />
                </div>

                {/* If product has image prop, uncomment below */}
                {/* <Image 
            src={product.image || '/placeholder.jpg'} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
        /> */}

                {/* Overlay / Action */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                    }}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-white"
                    aria-label="Add to Request List"
                >
                    <Plus size={20} strokeWidth={1.5} />
                </button>
            </div>

            {/* Details */}
            <Link href={`/product/${product.id}`} className="block space-y-1">
                <h3 className="text-secondary font-serif text-lg leading-tight group-hover:text-accent transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                <div className="flex items-center justify-between pt-1">
                    <span className="font-medium text-secondary">${product.price}</span>
                    <span className="text-xs text-xs uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                        {product.type}
                    </span>
                </div>
            </Link>
        </div>
    );
}
