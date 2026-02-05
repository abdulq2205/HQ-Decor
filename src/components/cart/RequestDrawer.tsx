"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Copy, Mail, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export function RequestDrawer() {
    const { isCartOpen, setIsCartOpen, items, removeFromCart, cartCount } = useCart();
    const [deliveryOption, setDeliveryOption] = useState<"coppell" | "texas" | "pickup" | null>(null);

    const subtotal = items.reduce((sum, item) => sum + item.price, 0);

    const generateRequestMessage = () => {
        let message = "Hi HQ Decor! I'm interested in the following items:\n\n";
        items.forEach((item) => {
            message += `- ${item.name} ($${item.price})`;
            if (item.selectedVariant) message += ` [${item.selectedVariant}]`;
            if (item.selectedText) message += ` [Style: ${item.selectedText}]`;
            if (item.customText) message += ` [Note: ${item.customText}]`;
            message += "\n";
        });

        message += `\nTotal Value: ~$${subtotal}`;

        if (deliveryOption === "coppell") message += "\nLocation: Coppell/Valley Ranch (Free Delivery Eligible)";
        if (deliveryOption === "texas") message += "\nLocation: Within 1 Hr Drive (Delivery Fee Applies)";
        if (deliveryOption === "pickup") message += "\nLocation: Pickup Only";

        return message;
    };

    const handleSendEmail = () => {
        const subject = "New Order Inquiry";
        const body = encodeURIComponent(generateRequestMessage());
        window.location.href = `mailto:hello@hqdecor.com?subject=${subject}&body=${body}`;
    };

    const handleSendInstagram = () => {
        const message = generateRequestMessage();
        navigator.clipboard.writeText(message);
        window.open("https://instagram.com/hqdecor", "_blank");
        alert("Order details copied to clipboard! Please paste them in our Instagram DM.");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="font-serif text-2xl text-secondary">Your Request List ({cartCount})</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-secondary hover:bg-gray-100 p-2 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="text-center py-12 text-gray-400 space-y-4">
                                    <p>Your list is empty.</p>
                                    <Link href="/shop" onClick={() => setIsCartOpen(false)} className="inline-block text-secondary underline hover:text-accent">
                                        Start Browsing
                                    </Link>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {items.map((item) => (
                                        <li key={item.cartId} className="flex gap-4">
                                            <div className="w-20 h-24 bg-gray-100 rounded-xs shrink-0 flex items-center justify-center text-gray-400 text-xs">
                                                {/* Image */}
                                                IMG
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-medium text-secondary">{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item.cartId)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500">${item.price}</p>
                                                <div className="text-xs text-gray-400 space-y-0.5">
                                                    {item.selectedVariant && <p>Finish: {item.selectedVariant}</p>}
                                                    {item.selectedText && <p>Style: {item.selectedText}</p>}
                                                    {item.customText && <p>Note: {item.customText}</p>}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer / Qualification */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 p-6 space-y-6 bg-gray-50">
                                {/* Qualification Logic */}
                                <div className="space-y-3">
                                    <h3 className="font-serif text-lg">Delivery Qualification</h3>
                                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-xs text-amber-800 text-xs mb-3">
                                        <strong>Important:</strong> We currently only serve Texas orders.
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-sm cursor-pointer bg-white hover:border-secondary transition-colors">
                                            <input type="radio" name="delivery" className="mt-1" onChange={() => setDeliveryOption("coppell")} />
                                            <div>
                                                <span className="block text-sm font-medium text-secondary">Coppell / Valley Ranch</span>
                                                <span className="block text-xs text-gray-500">Eligible for Free Delivery</span>
                                            </div>
                                        </label>

                                        <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-sm cursor-pointer bg-white hover:border-secondary transition-colors">
                                            <input type="radio" name="delivery" className="mt-1" onChange={() => setDeliveryOption("texas")} />
                                            <div>
                                                <span className="block text-sm font-medium text-secondary">Other Texas Location</span>
                                                <span className="block text-xs text-gray-500">~1 Hr Drive (Delivery Fee Applies)</span>
                                            </div>
                                        </label>

                                        <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-sm cursor-pointer bg-white hover:border-secondary transition-colors">
                                            <input type="radio" name="delivery" className="mt-1" onChange={() => setDeliveryOption("pickup")} />
                                            <div>
                                                <span className="block text-sm font-medium text-secondary">Pickup Only</span>
                                                <span className="block text-xs text-gray-500">I will pick up from Coppell</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-3 pt-2">
                                    <button
                                        disabled={!deliveryOption}
                                        onClick={handleSendEmail}
                                        className="w-full py-3 bg-secondary text-white font-medium uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Mail size={18} /> Send via Email
                                    </button>
                                    <button
                                        disabled={!deliveryOption}
                                        onClick={handleSendInstagram}
                                        className="w-full py-3 border border-secondary text-secondary font-medium uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Instagram size={18} /> Send via Instagram
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
