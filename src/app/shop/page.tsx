"use client";

import { useState, useMemo, Suspense } from "react";
import { products, Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-40 text-center">Loading Shop...</div>}>
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
        <div className="w-full">
            {/* Header Section */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-10">
                <h1 className="font-sans text-4xl md:text-5xl font-medium uppercase tracking-wide transform scale-x-125 origin-left inline-block">Solid Wovens</h1>
            </div>

            {/* Filter & Sort Bar */}
            <div className="border-t border-b border-gray-200 bg-gray-50/50 sticky top-0 z-30">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12 text-xs font-bold uppercase tracking-widest text-secondary">
                        {/* Filter Toggle */}
                        <button
                            className="flex items-center gap-2 hover:text-accent transition-colors border-r border-gray-200 h-full pr-6"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <SlidersHorizontal size={14} />
                            {isMobileFiltersOpen ? "Hide Filters" : "Show Filters"}
                        </button>

                        <div className="relative group h-full flex items-center pl-6 border-l border-gray-200">
                            <button className="flex items-center gap-2 hover:text-accent transition-colors">
                                Sort by <ChevronDown size={14} />
                            </button>
                            <div className="absolute right-0 top-full w-48 bg-white border border-gray-100 shadow-lg hidden group-hover:block z-40">
                                <button
                                    className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${sortOrder === "asc" ? "text-accent" : ""}`}
                                    onClick={() => setSortOrder("asc")}
                                >
                                    Price: Low to High
                                </button>
                                <button
                                    className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${sortOrder === "desc" ? "text-accent" : ""}`}
                                    onClick={() => setSortOrder("desc")}
                                >
                                    Price: High to Low
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex min-h-screen">
                {/* Sidebar (Desktop) */}
                <aside
                    className={`
                        bg-[#F4F4F4] border-r border-gray-200 transition-all duration-300 overflow-hidden
                        ${isMobileFiltersOpen ? "w-64 opacity-100 p-6" : "w-0 opacity-0 p-0 border-none"}
                        hidden md:block
                    `}
                >
                    <div className="space-y-6 w-52">
                        {/* Mock Filter Sections */}
                        {["Availability", "Price", "Color", "Size", "Product Type"].map((section) => (
                            <div key={section} className="border-b border-gray-300 pb-4">
                                <button className="flex justify-between items-center w-full text-sm font-medium uppercase tracking-wide text-secondary hover:text-accent">
                                    {section} <ChevronDown size={14} />
                                </button>
                                {/* Active 'Product Type' or 'Color' content could go here */}
                                {section === "Product Type" && (
                                    <div className="mt-4 space-y-2">
                                        {allTypes.map((type) => (
                                            <label key={type} className="flex items-center cursor-pointer group hover:text-accent">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(type)}
                                                    onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-gray-600">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Grid Content */}
                <div className="flex-1 transition-all duration-300">
                    <div className={`max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12`}>
                        {filteredProducts.length > 0 ? (
                            <div className={`grid gap-x-8 gap-y-12 transition-all duration-300 ${isMobileFiltersOpen ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
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
        </div>
    );
}
