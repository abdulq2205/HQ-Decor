"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            // Hero is 79vh, so check if we've scrolled past that
            setIsPastHero(window.scrollY > (window.innerHeight * 0.79));
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Custom Orders", href: "/custom-orders" },
        { name: "About", href: "/about" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" },
    ];

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    // Logic:
    // If Home AND not scrolled -> Transparent bg, White text
    // Else -> White/Blur bg, Dark text
    const isTransparent = isHome && !isScrolled;
    const shouldHide = isHome && isPastHero;

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                shouldHide ? "-translate-y-full" : "translate-y-0",
                isTransparent
                    ? "bg-transparent border-transparent text-white pt-7"
                    : "bg-primary/95 backdrop-blur-md border-b border-gray-100 text-[#4A3427] pb-2"
            )}
            onMouseLeave={() => setHoveredLink(null)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={cn("transition-colors", isTransparent ? "hover:text-gray-200" : "hover:text-accent")}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto absolute left-0 right-0 md:relative pointer-events-none md:pointer-events-auto">
                        <Link href="/" className="pointer-events-auto font-playfair-manual text-3xl md:text-4xl tracking-tight">
                            <span className="text-6xl md:text-7xl">HQ</span> decor
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-15 items-center pt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                className={cn(
                                    "text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 relative group py-1",
                                    // Scale effect on hover
                                    "hover:scale-110 origin-center",
                                    isTransparent ? "text-white/90 hover:text-white" : "text-[#4A3427] hover:text-accent"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute left-0 bottom-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                                    isTransparent ? "bg-white" : "bg-accent"
                                )} />
                            </Link>
                        ))}
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-6 z-10 pt-4">
                        <button className={cn("transition-colors", isTransparent ? "text-white hover:text-gray-200" : "text-[#4A3427] hover:text-accent")}>
                            <Search size={20} strokeWidth={1} />
                        </button>
                        <button
                            className={cn("transition-colors relative", isTransparent ? "text-white hover:text-gray-200" : "text-[#4A3427] hover:text-accent")}
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag size={20} strokeWidth={1} />
                            <span className={cn(
                                "absolute -top-2 -right-2 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold",
                                isTransparent ? "bg-white text-black" : "bg-accent text-white"
                            )}>
                                {cartCount}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer (Always white bg) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden bg-primary border-b border-gray-100 text-secondary"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-3 text-base font-medium hover:bg-gray-50 hover:text-accent rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
