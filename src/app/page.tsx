"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, FileText, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-0">

      {/* Hero Section */}
      <section className="relative h-[79vh] flex items-end justify-start bg-neutral-900 overflow-hidden">
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

        <div className="relative z-10 w-full px-5 md:px-7 pb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="space-y-4">
            <h1 className="text-white font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-normal uppercase leading-[0.9] transform scale-x-125 origin-left w-fit">
              The Ramadan Capsule
            </h1>
            <p className="text-white/90 text-sm md:text-base font-medium pl-1">
              Two Tones. One Seamless Tradition.
            </p>
            <div className="pt-3 pl-1">
              <Link
                href="/shop"
                className="inline-block bg-white text-black px-17 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories / Collections Carousel */}
      <section className="pt-12 pb-24 w-full px-5 md:px-7">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-sans text-2xl md:text-4xl uppercase tracking-normal transform scale-x-125 origin-left w-fit">Best Sellers</h2>
        </div>

        {/* Carousel Container Wrapper */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-[140px] md:top-[175px] -translate-y-1/2 z-50 p-3 bg-white border border-gray-200 text-black transition-all opacity-0 group-hover:opacity-100 shadow-md ml-4"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-[140px] md:top-[175px] -translate-y-1/2 z-50 p-3 bg-white border border-gray-200 text-black transition-all opacity-0 group-hover:opacity-100 shadow-md mr-4"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Area */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { name: "LEPPI", price: "$27.00 USD", image: "bg-stone-200" },
              { name: "OM AL DUNYA", price: "$27.00 USD", image: "bg-amber-100" },
              { name: "OMBRE ROUGE", price: "$27.00 USD", image: "bg-red-900/40" },
              { name: "OMBRE NOIR", price: "$27.00 USD", image: "bg-neutral-800" },
              { name: "FLORAL MIST", price: "$27.00 USD", image: "bg-emerald-100" },
              { name: "DESERT SAND", price: "$27.00 USD", image: "bg-orange-100" }
            ].map((cat) => (
              <div key={cat.name} className="flex-none w-[280px] md:w-[350px] snap-start group/card cursor-pointer">
                {/* Image Container with Hover Overlay */}
                <div className="relative aspect-square overflow-hidden mb-4 bg-gray-100">
                  <div className={`w-full h-full ${cat.image} transition-transform duration-700 group-hover/card:scale-105`} />

                  {/* Hover Add to Cart Bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#008A45] text-white py-3 text-center uppercase text-xs font-bold tracking-widest translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                    Add to Cart
                  </div>
                </div>

                {/* Text Info */}
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-wide">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.price}</p>
                </div>
              </div>
            ))}
          </div>
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
