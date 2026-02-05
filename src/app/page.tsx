import Link from "next/link";
import { ArrowRight, ShoppingBag, FileText, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-0">

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-50 overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-neutral-200">
          {/* In production, use next/image with a real hero image */}
          <div className="w-full h-full bg-linear-to-b from-gray-200 to-gray-300 opacity-50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-secondary tracking-tight">
            Handmade Islamic Décor for <br />
            <span className="italic font-light">Meaningful Celebrations</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="px-8 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 font-medium uppercase tracking-widest text-sm min-w-[200px]"
            >
              Browse Collection
            </Link>
            <Link
              href="/custom-orders"
              className="px-8 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 font-medium uppercase tracking-widest text-sm min-w-[200px]"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">Curated Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Ramadan", image: "bg-amber-50" },
            { name: "Eid", image: "bg-emerald-50" },
            { name: "Wall Signs", image: "bg-stone-50" },
            { name: "Wreaths", image: "bg-orange-50" },
            { name: "Tabletop", image: "bg-blue-50" },
            { name: "Gifts", image: "bg-pink-50" }
          ].map((cat) => (
            <Link key={cat.name} href={`/shop?category=${cat.name}`} className="group relative aspect-[4/3] overflow-hidden block">
              <div className={`w-full h-full ${cat.image} transition-transform duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                <span className="text-white font-serif text-3xl font-medium tracking-wide drop-shadow-md">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seasonal Banner */}
      <section className="bg-accent py-16 text-center text-white px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="uppercase tracking-widest text-sm opacity-90">New Arrivals</p>
          <h2 className="font-serif text-4xl md:text-5xl">Ramadan Collection Now Available</h2>
          <div className="pt-6">
            <Link href="/shop" className="inline-block border-b border-white pb-1 hover:opacity-80 transition-opacity">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Process Strip */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-50 rounded-full text-secondary">
                <ShoppingBag size={32} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl">1. Browse & Select</h3>
              <p className="text-gray-500 text-sm max-w-xs">Explore our handmade collection and add your favorite items to the request list.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-50 rounded-full text-secondary">
                <FileText size={32} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl">2. Submit Request</h3>
              <p className="text-gray-500 text-sm max-w-xs">Review your list and submit an inquiry via Email or Instagram DM.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-50 rounded-full text-secondary">
                <CheckCircle size={32} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl">3. Confirm Details</h3>
              <p className="text-gray-500 text-sm max-w-xs">We will confirm availability, customization details, and payment options with you.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
