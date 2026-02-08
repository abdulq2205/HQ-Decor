"use client";

import { useState, use, Suspense } from "react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ChevronDown, ChevronUp, Check, ArrowLeft, Star, Info, MessageCircle, Heart, Share2, Ruler } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Since we are using client component, we unwrap params with React.use()
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div className="min-h-screen pt-40 text-center">Loading Product...</div>}>
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
    // Mocks for visual matching of reference
    const colors = ["#4A192C", "#A87C7C", "#C492B1", "#8E354A", "#9E2A2B", "#6D3B47", "#D6BCC0", "#540B0E", "#335C67", "#E09F3E"];
    const sizes = ["STANDARD", "DOUBLE", "MINI", "SQUARE"];

    const [selectedSize, setSelectedSize] = useState("STANDARD");
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<"description" | "size">("description");

    // Existing logic for variants if they obey the data model
    const [selectedVariant, setSelectedVariant] = useState<string | undefined>(product.variants?.[0]);

    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        // In a real app, we would pass the selected size/color/etc to the cart
        addToCart(product, {
            variant: selectedVariant || selectedColor, // Fallback to color mock
            text: selectedSize, // Fallback using text field for size
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Image Section */}
                <div className="space-y-4">
                    <div className="aspect-square bg-neutral-100 relative overflow-hidden group">
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-gray-400">
                            {/* Placeholder logic matching Home Page */}
                            <div className={`w-full h-full bg-neutral-200`} />
                        </div>
                        {/* Accessibility Button Overlay (Mock) */}
                        <div className="absolute bottom-4 left-4">
                            <div className="bg-[#005740] rounded-full p-2 text-white cursor-pointer hover:bg-[#004230] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 14.14 14.14" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Details Section */}
                <div className="space-y-8 pt-20">
                    <div className="space-y-2">
                        <h1 className="text-4xl text-secondary" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>{product.name}</h1>


                    </div>

                    <div className="space-y-1">
                        <p className="text-xl font-bold text-gray-900">${product.price}.00 USD</p>

                    </div>

                    {/* Stock Status */}


                    {/* Color Selection (Mock Visually to match screenshot) */}
                    <div className="space-y-3">
                        <p className="text-sm">Color: <span className="text-gray-500">{product.variants?.[0] || "Fuchsia Glow"}</span></p>
                        <div className="flex flex-wrap gap-2">
                            {colors.map((color, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? "border-gray-900 scale-110" : "border-transparent hover:scale-105"}`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Select color ${idx}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-gray-50/50 p-1">
                            <p className="text-xs font-bold uppercase tracking-widest">Size</p>
                            {/* Size Guide Link Mock */}
                            <button className="text-xs underline text-gray-500 hover:text-secondary">Size Guide</button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-6 py-2 border text-xs font-bold uppercase tracking-wider transition-all duration-200 ${selectedSize === size
                                        ? "border-gray-900 bg-gray-50 text-black"
                                        : "border-gray-200 text-gray-500 hover:border-gray-400"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex gap-4">
                        {/* Quantity Dropdown */}
                        <div className="relative w-24">
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-full h-full p-3 border border-gray-200 bg-white text-sm appearance-none focus:outline-hidden cursor-pointer"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" size={14} />
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 ${isAdded
                                ? "bg-[#2a412e]"
                                : "bg-[#3A5A40] hover:bg-[#2a412e]"
                                }`}
                        >
                            {isAdded ? "Added to List" : "Add to List"}
                        </button>
                    </div>

                    {/* Description Tabs */}
                    <div className="pt-8 space-y-6">
                        <div className="border-b border-gray-200 flex gap-8">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === "description" ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab("size")}
                                className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === "size" ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                Size & Fit
                            </button>
                        </div>

                        <div className="min-h-[100px] text-sm text-gray-600 leading-relaxed">
                            {activeTab === "description" ? (
                                <p>{product.description || "Bold yet refined, this item is the vibrant pop of color your wardrobe needs. Crafted from our signature materials, it offers effortless styling with a luxurious feel."}</p>
                            ) : (
                                <div className="space-y-2">
                                    <p>Standard: 70" x 27"</p>
                                    <p>Double: 80" x 35"</p>
                                    <p>Mini: 50" x 20"</p>
                                    <p>Square: 40" x 40"</p>
                                </div>
                            )}
                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
}
