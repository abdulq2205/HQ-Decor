"use client";

import { useState } from "react";
import { Send, Upload } from "lucide-react";

export default function CustomOrdersPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        instagram: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            alert("Request sent! We will contact you shortly.");
            setIsSubmitting(false);
            setFormData({ name: "", email: "", instagram: "", description: "" });
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center space-y-4 mb-12">
                <h1 className="font-serif text-4xl md:text-5xl text-secondary">Custom Creations</h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Have a specific vision? We'd love to bring it to life. Fill out the form below to start the conversation.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-8 rounded-sm shadow-xs border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-gray-200 focus:outline-hidden focus:border-secondary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Email</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 border border-gray-200 focus:outline-hidden focus:border-secondary transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Instagram Handle</label>
                    <input
                        type="text"
                        placeholder="@"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        className="w-full p-3 border border-gray-200 focus:outline-hidden focus:border-secondary transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Description</label>
                    <textarea
                        required
                        rows={5}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Tell us about your theme, colors, and what you are looking for..."
                        className="w-full p-3 border border-gray-200 resize-none focus:outline-hidden focus:border-secondary transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wider text-gray-500">Reference Image (Optional)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-sm p-8 text-center hover:bg-white hover:border-gray-300 transition-all cursor-pointer">
                        <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <input type="file" className="hidden" accept="image/*" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-secondary text-white font-medium uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                    {isSubmitting ? "Sending..." : (
                        <>
                            Submit Request <Send size={16} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
