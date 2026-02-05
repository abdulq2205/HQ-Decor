"use client";

import { useState, useMemo, Suspense } from "react";
import { products, Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading Shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}

function ShopContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");

    const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : []);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Extract unique categories and types for filters
    const allCategories = Array.from(new Set(products.flatMap((p) => p.category)));
    const allTypes = Array.from(new Set(products.map((p) => p.type)));

    const toggleFilter = (item: string, current: string[], setter: (val: string[]) => void) => {
        if (current.includes(item)) {
            setter(current.filter((i) => i !== item));
        } else {
            setter([...current, item]);
        }
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategories.length > 0) {
            result = result.filter((p) => p.category.some((c) => selectedCategories.includes(c)));
        }

        if (selectedTypes.length > 0) {
            result = result.filter((p) => selectedTypes.includes(p.type));
        }

        if (sortOrder === "asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [selectedCategories, selectedTypes, sortOrder]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className={`md:w-64 space-y-8 ${isMobileFiltersOpen ? "block" : "hidden md:block"}`}>
                    <div>
                        <h3 className="font-serif text-lg font-medium mb-4">Categories</h3>
                        <div className="space-y-2">
                            {allCategories.map((cat) => (
                                <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={`w-4 h-4 border border-gray-300 rounded-xs flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? "bg-secondary border-secondary" : "group-hover:border-gray-400"}`}>
                                        {selectedCategories.includes(cat) && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                        className="hidden"
                                    />
                                    <span className={`text-sm ${selectedCategories.includes(cat) ? "text-secondary font-medium" : "text-gray-500"}`}>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif text-lg font-medium mb-4">Product Type</h3>
                        <div className="space-y-2">
                            {allTypes.map((type) => (
                                <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={`w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? "bg-secondary border-secondary" : "group-hover:border-gray-400"}`}>
                                        {selectedTypes.includes(type) && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                                        className="hidden"
                                    />
                                    <span className={`text-sm ${selectedTypes.includes(type) ? "text-secondary font-medium" : "text-gray-500"}`}>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="font-serif text-3xl">Shop All</h1>

                        <div className="flex items-center gap-4">
                            {/* Mobile Filter Toggle */}
                            <button
                                className="md:hidden flex items-center gap-2 text-sm text-secondary"
                                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            >
                                <SlidersHorizontal size={16} /> Filters
                            </button>

                            {/* Sort Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-sm text-secondary hover:text-accent">
                                    Sort by <ChevronDown size={14} />
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 shadow-lg p-2 rounded-md hidden group-hover:block z-10">
                                    <button
                                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${sortOrder === "asc" ? "font-bold" : ""}`}
                                        onClick={() => setSortOrder("asc")}
                                    >
                                        Price: Low to High
                                    </button>
                                    <button
                                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${sortOrder === "desc" ? "font-bold" : ""}`}
                                        onClick={() => setSortOrder("desc")}
                                    >
                                        Price: High to Low
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center text-gray-500">
                            <p>No products found matching your selection.</p>
                            <button
                                onClick={() => { setSelectedCategories([]); setSelectedTypes([]); }}
                                className="mt-4 text-sm underline hover:text-secondary"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
