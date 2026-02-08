"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, FileText, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { products } from "@/data/products";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

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

        <div className="relative z-10 w-full px-5 md:px-7 pb-8">
          <ScrollReveal>
            <div>
              <h1 className="text-white font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-normal uppercase leading-[0.9] transform scale-x-125 origin-left w-fit mb-8">
                The Ramadan Capsule
              </h1>
              <p className="text-white/90 text-sm md:text-base font-medium pl-1 mb-5">
                Two Tones. One Seamless Tradition.
              </p>
              <div className="pl-1">
                <Link
                  href="/shop"
                  className="inline-block bg-white text-black px-17 py-3 text-xs font-normal uppercase tracking-widest hover:bg-gray-200 hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Categories / Collections Carousel */}
      <section className="pt-12 pb-24 w-full px-5 md:px-7">
        <div className="flex justify-between items-end mb-12">
          <ScrollReveal>
            <h2 className="font-sans text-2xl md:text-4xl uppercase tracking-normal transform scale-x-125 origin-left w-fit">Explore Products</h2>
          </ScrollReveal>
        </div>

        {/* Carousel Container Wrapper */}
        <ScrollReveal delay={0.2}>
          <div className="relative group">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-[175px] md:top-[225px] -translate-y-1/2 z-50 p-3 bg-white border border-gray-200 text-black hover:bg-[#7CA982] hover:text-white hover:border-transparent transition-all shadow-md ml-4 ${!canScrollLeft ? "hidden" : "opacity-0 group-hover:opacity-100"}`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-[175px] md:top-[225px] -translate-y-1/2 z-50 p-3 bg-white border border-gray-200 text-black hover:bg-[#7CA982] hover:text-white hover:border-transparent transition-all shadow-md mr-4 ${!canScrollRight ? "hidden" : "opacity-0 group-hover:opacity-100"}`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>

            {/* Scrollable Area */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.slice(0, 6).map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="flex-none w-[350px] md:w-[450px] snap-start group/card cursor-pointer">
                  {/* Image Container with Hover Overlay */}
                  <div className="relative aspect-square overflow-hidden bg-white border border-[#4A3427]">
                    <div className={`w-full h-full bg-neutral-200 transition-transform duration-700 group-hover/card:scale-105`} />

                    {/* Hover Add to Cart Bar */}
                    <div className="absolute inset-x-0 bottom-0 bg-[#3A5A40]/75 text-white py-3 text-center uppercase text-xs font-bold tracking-widest translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                      Add to Cart
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="text-center space-y-1 border-x border-b border-[#3A5A40] p-4 bg-white">
                    <h3 className="text-sm font-bold uppercase tracking-wide">{product.name}</h3>
                    <p className="text-xs text-gray-500">${product.price}.00 USD</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Shop All Button */}
      <div className="flex justify-center pb-8 -mt-20">
        <ScrollReveal delay={0.3}>
          <Link
            href="/shop"
            className="inline-block bg-[#E0EEDF] border border-[#3A5A40] text-[#3A5A40] px-17 py-3 text-xs font-normal uppercase tracking-widest hover:bg-[#3A5A40] hover:text-white hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300"
          >
            Shop All
          </Link>
        </ScrollReveal>
      </div>

      {/* Seasonal Banner */}
      {/* Process Strip */}
      {/* Browse & Select Section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex items-center justify-center p-12 lg:p-24 order-2 lg:order-1">
            <ScrollReveal>
              <div className="max-w-lg space-y-12">
                <div className="space-y-4">
                  <h2 className="font-sans text-2xl md:text-4xl uppercase tracking-normal transform scale-x-125 origin-left w-fit">
                    Ordering Process
                  </h2>
                </div>

                <div className="relative pl-8 ml-3">
                  {/* Step 1 */}
                  <div className="relative pb-12">
                    {/* Connecting Line */}
                    <div className="absolute left-0 top-6 bottom-0 w-px bg-gray-300 -translate-x-1/2"></div>
                    {/* Marker */}
                    <span className="absolute left-0 -translate-x-1/2 top-1.5 h-5 w-5 bg-neutral-800"></span>
                    <div className="space-y-3 pl-12">
                      <h3 className="font-serif text-2xl uppercase tracking-widest text-neutral-800">Browse & Select</h3>
                      <p className="text-xs font-normal uppercase tracking-widest text-gray-600 max-w-sm">
                        Explore our handmade collection and add your favorite items to the request list.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative pb-12">
                    {/* Connecting Line */}
                    <div className="absolute left-0 top-6 bottom-0 w-px bg-gray-300 -translate-x-1/2"></div>
                    {/* Marker */}
                    <span className="absolute left-0 -translate-x-1/2 top-1.5 h-5 w-5 bg-neutral-800"></span>
                    <div className="space-y-3 pl-12">
                      <h3 className="font-serif text-2xl uppercase tracking-widest text-neutral-800">Submit Request</h3>
                      <p className="text-xs font-normal uppercase tracking-widest text-gray-600 max-w-sm">
                        Review your list and submit an inquiry via Email or Instagram DM.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    {/* Marker (No Line) */}
                    <span className="absolute left-0 -translate-x-1/2 top-1.5 h-5 w-5 bg-neutral-800"></span>
                    <div className="space-y-3 pl-12">
                      <h3 className="font-serif text-2xl uppercase tracking-widest text-neutral-800">Confirm Details</h3>
                      <p className="text-xs font-normal uppercase tracking-widest text-gray-600 max-w-sm">
                        We will confirm availability, customization details, and payment options with you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-square order-1 lg:order-2">
            <ScrollReveal delay={0.2} className="h-full w-full">
              <div className="absolute inset-0 h-full w-full">
                <img
                  src="/images/browse-select.jpg"
                  alt="Browse and Select"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process Strip */}


    </div>
  );
}
