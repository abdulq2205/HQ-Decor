"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-primary pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl">HQ Decor</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            Handmade Islamic Décor for Ramadan, Eid & Meaningful Celebrations.
                        </p>
                    </div>

                    {/* Column 2: Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Navigate</h4>
                        <div className="flex flex-col space-y-3">
                            <Link href="/shop" className="text-sm hover:text-accent-gold transition-colors">Shop Collection</Link>
                            <Link href="/custom-orders" className="text-sm hover:text-accent-gold transition-colors">Custom Orders</Link>
                            <Link href="/contact" className="text-sm hover:text-accent-gold transition-colors">Contact Us</Link>
                        </div>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Connect</h4>
                        <p className="text-sm text-gray-300">Coppell, Texas</p>
                        <a
                            href="https://instagram.com/hqdecor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-sm hover:text-accent-gold transition-colors justify-center md:justify-start"
                        >
                            <Instagram size={18} />
                            <span>@hqdecor</span>
                        </a>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} HQ Decor. All rights reserved. <br />
                        <span className="text-accent-gold mt-2 block">Texas orders only at this time.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
