import Link from "next/link";
import { ArrowRight, ShoppingBag, FileText, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-0">

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-end justify-start bg-neutral-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* 
             NOTE: To truly match Vela, we need a high-quality dark/moody image.
             Using a CSS gradient here to mimic the dark red/shadowy vibe.
             In production, replace with <Image src="..." /> 
           */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-neutral-900 to-black opacity-80 z-0" />
          {/* Fallback dark bg */}
          <div className="absolute inset-0 bg-black/40 z-0" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-white font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-[0.9]">
              The Ramadan <br /> Capsule
            </h1>
            <p className="text-white/90 text-sm md:text-base tracking-[0.2em] font-medium uppercase pl-1">
              Two Tones. One Seamless Tradition.
            </p>
            <div className="pt-8 pl-1">
              <Link
                href="/shop"
                className="inline-block bg-white text-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Shop Now
              </Link>
            </div>
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
