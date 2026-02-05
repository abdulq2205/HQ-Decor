import { Instagram } from "lucide-react";

export default function GalleryPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="font-serif text-4xl mb-8">Our Gallery</h1>
            <p className="text-gray-500 mb-12">Follow us on Instagram to see our latest creations.</p>

            {/* Masonry Grid Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 relative group overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                            <Instagram className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
