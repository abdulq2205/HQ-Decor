"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export type CartItem = Product & {
    cartId: string; // Unique ID for the item in cart (to handle same product with different variants)
    selectedVariant?: string;
    selectedText?: string;
    customText?: string;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Product, options?: { variant?: string; text?: string; custom?: string }) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem("hq-decor-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("hq-decor-cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addToCart = (product: Product, options?: { variant?: string; text?: string; custom?: string }) => {
        const newItem: CartItem = {
            ...product,
            cartId: crypto.randomUUID(),
            selectedVariant: options?.variant,
            selectedText: options?.text,
            customText: options?.custom,
        };
        setItems((prev) => [...prev, newItem]);
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId: string) => {
        setItems((prev) => prev.filter((item) => item.cartId !== cartId));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartCount: items.length,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
