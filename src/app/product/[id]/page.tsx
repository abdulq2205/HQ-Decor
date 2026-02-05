"use client";

import { useState, use, Suspense } from "react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ChevronDown, ChevronUp, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Since we are using client component, we unwrap params with React.use()
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // Use Suspense boundary if needed, but params promise handling is robust in Next 15+
    return (
        <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading Product...</div>}>
            <ProductContent params={params} />
        </Suspense>
    );
}

function ProductContent({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const product = products.find((p) => p.id === parseInt(resolvedParams.id));

    if (!product) {
        notFound();
    }

    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = useState<string | undefined>(product.variants?.[0]);
    const [selectedText, setSelectedText] = useState<string | undefined>(product.textOptions?.[0]);
    const [customText, setCustomText] = useState("");
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, {
            variant: selectedVariant,
            text: selectedText,
            custom: customText,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-secondary mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {/* Left: Image Gallery (Single Image for MVP) */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-gray-100 relative rounded-sm overflow-hidden group">
                        {/* Image Placeholder */}
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-gray-400">
                            <span className="sr-only">{product.name}</span>
                            {/* Real Image would go here */}
                        </div>
                        <div className="absolute inset-0 bg-black/5" />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h1 className="font-serif text-4xl md:text-5xl text-secondary">{product.name}</h1>
                        <p className="text-xl font-medium text-gray-900">${product.price}</p>
                        <p className="text-gray-600 leading-relaxed">{product.description || "A beautiful handmade addition to your collection."}</p>
                    </div>

                    <div className="space-y-8 border-t border-gray-100 pt-8">
                        {/* Variants */}
                        {product.variants && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Select Finish</label>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`px-4 py-2 border text-sm transition-all duration-200 ${selectedVariant === variant
                                                    ? "border-secondary bg-secondary text-white"
                                                    : "border-gray-200 text-gray-600 hover:border-secondary"
                                                }`}
                                        >
                                            {variant}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Text Options */}
                        {product.textOptions && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Design Style</label>
                                <div className="relative">
                                    <select
                                        value={selectedText}
                                        onChange={(e) => setSelectedText(e.target.value)}
                                        className="w-full p-3 border border-gray-200 bg-white text-secondary focus:outline-hidden focus:border-secondary transition-colors appearance-none rounded-none"
                                    >
                                        {product.textOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>
                        )}

                        {/* Custom Text Logic: If it allows custom text, or if we want to allow it globally for 'Custom' products. 
                 PRD says: "Custom Wording" (only appears if product allows). 
                 We don't have a flag for that in data currently, let's assume if it has type 'Decor' or 'Wall' maybe? 
                 Or just add a 'Custom' field to generic request. Let's add it always for now as "Notes/Customization" */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Custom Wording / Notes</label>
                            <textarea
                                rows={3}
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                placeholder="Enter any specific customization requests here..."
                                className="w-full p-3 border border-gray-200 text-sm focus:outline-hidden focus:border-secondary transition-colors resize-none placeholder:text-gray-300 rounded-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`w-full py-4 text-center font-medium uppercase tracking-widest transition-all duration-300 ${isAdded
                                ? "bg-accent text-white"
                                : "bg-secondary text-white hover:bg-black"
                            }`}
                    >
                        {isAdded ? (
                            <span className="flex items-center justify-center gap-2"><Check size={18} /> Added to Request List</span>
                        ) : "Add to Request List"}
                    </button>

                    {/* Delivery Accordion */}
                    <div className="border-t border-gray-100 pt-4">
                        <button
                            onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                            className="flex items-center justify-between w-full py-2 text-left hover:text-accent transition-colors"
                        >
                            <span className="font-serif text-lg">Delivery Information</span>
                            {isDeliveryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${isDeliveryOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="text-sm text-gray-500 space-y-2 bg-gray-50 p-4 rounded-sm">
                                <p><span className="font-semibold text-secondary">Coppell & Valley Ranch:</span> Free local delivery.</p>
                                <p><span className="font-semibold text-secondary">Texas Orders:</span> Pickup or delivery within 1 hour drive (fee applies).</p>
                                <p className="text-xs text-gray-400 italic">We currently do not ship outside of Texas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
