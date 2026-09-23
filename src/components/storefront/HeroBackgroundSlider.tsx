'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react'

export type HeroSlideItem = {
  id: string
  image_url: string
  tag?: string
  title?: string
  subtitle?: string
  button_text?: string
  button_link?: string
  text_mode?: 'global' | 'per_slide'
  is_active?: boolean
}

export type GlobalHeroText = {
  title: string
  subtitle: string
  button_text: string
  button_link: string
}

export function HeroBackgroundSlider({
  slides,
  textMode = 'per_slide',
  globalText,
}: {
  slides: HeroSlideItem[]
  textMode?: 'global' | 'per_slide'
  globalText?: GlobalHeroText
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slideCount = slides.length

  const nextSlide = useCallback(() => {
    if (slideCount <= 1) return
    setCurrentIndex((prev) => (prev + 1) % slideCount)
  }, [slideCount])

  const prevSlide = useCallback(() => {
    if (slideCount <= 1) return
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount)
  }, [slideCount])

  // Auto-advance slides every 5 seconds (paused on hover)
  useEffect(() => {
    if (slideCount <= 1 || isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [slideCount, isPaused, nextSlide])

  if (slideCount === 0) return null

  const currentSlide = slides[currentIndex] || slides[0]

  // Resolved dynamic text matching each specific slide
  const tag = currentSlide.tag || '✦ 100% Pure Indian Spices'

  const title =
    textMode === 'per_slide'
      ? currentSlide.title || globalText?.title || 'Pure Spice. Real Taste. Trusted Every Time.'
      : globalText?.title || currentSlide.title || 'Pure Spice. Real Taste. Trusted Every Time.'

  const subtitle =
    textMode === 'per_slide'
      ? currentSlide.subtitle ||
        globalText?.subtitle ||
        "Jaandaar Masale brings the richness of India's finest spices to your kitchen. Pure, natural & full of flavor."
      : globalText?.subtitle ||
        currentSlide.subtitle ||
        "Jaandaar Masale brings the richness of India's finest spices to your kitchen. Pure, natural & full of flavor."

  const buttonText =
    textMode === 'per_slide'
      ? currentSlide.button_text || globalText?.button_text || 'Shop Now'
      : globalText?.button_text || currentSlide.button_text || 'Shop Now'

  const buttonLink =
    textMode === 'per_slide'
      ? currentSlide.button_link || globalText?.button_link || '/shop'
      : globalText?.button_link || currentSlide.button_link || '/shop'

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#F5E6DF] via-[#F8ECE7] to-[#FAF3EB] py-8 sm:py-12 lg:py-16 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background subtle decorative elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E5AD58]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#7B111A]/8 blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Dynamic Text, CTA Buttons, Trust Badges */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Slide Tag Badge */}
            <div
              key={`tag-${currentIndex}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#C89B65]/40 text-xs font-bold text-[#7B111A] shadow-xs backdrop-blur-xs transition-all duration-500 animate-in fade-in"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89B65] animate-pulse" />
              <span>{tag}</span>
            </div>

            {/* Dynamic Animated Headline */}
            <div
              key={`title-${currentIndex}`}
              className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2"
            >
              <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-bold tracking-tight text-[#2A1612] leading-[1.18]">
                {title}
              </h1>
            </div>

            {/* Dynamic Animated Subtitle */}
            <div
              key={`sub-${currentIndex}`}
              className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-3"
            >
              <p className="text-xs sm:text-base lg:text-lg text-[#5A433B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {subtitle}
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div
              key={`cta-${currentIndex}`}
              className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
            >
              <Link
                href={buttonLink}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-[#7B111A] px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-semibold text-white shadow-md shadow-[#7B111A]/25 hover:bg-[#520C12] hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-center cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link
                href="/about"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-full border border-[#B3927D] bg-white/80 backdrop-blur-sm px-4 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-semibold text-[#2A1612] hover:bg-[#F2E8DC] hover:border-[#7B111A] transition-all text-center cursor-pointer"
              >
                Our Story
              </Link>
            </div>

            {/* 3 Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-3 sm:pt-4 max-w-md mx-auto lg:mx-0 border-t border-[#E8DFD5]/80">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 group">
                <div className="p-1.5 sm:p-2 rounded-full bg-[#7B111A]/10 text-[#7B111A] group-hover:scale-110 transition-transform">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#2A1612] leading-tight">100% Natural</span>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 group">
                <div className="p-1.5 sm:p-2 rounded-full bg-[#7B111A]/10 text-[#7B111A] group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#2A1612] leading-tight">No Preservatives</span>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 group">
                <div className="p-1.5 sm:p-2 rounded-full bg-[#7B111A]/10 text-[#7B111A] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#2A1612] leading-tight">Premium Quality</span>
              </div>
            </div>

          </div>

          {/* Right Column: Middle Showcase Image (Direct clean image without thick border/box) */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative">
            
            <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] aspect-square flex items-center justify-center">
              
              {/* Clean Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-[#7B111A]/15 bg-white/40">
                {slides.map((slide, index) => {
                  const isActive = index === currentIndex
                  return (
                    <div
                      key={slide.id || index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 z-0 pointer-events-none'
                      }`}
                    >
                      <Image
                        src={slide.image_url}
                        alt={slide.title || 'Jaandaar Masale Artisanal Spice'}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )
                })}
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Slide Indicators & Navigation Arrows on Bottom Right */}
        {slideCount > 1 && (
          <div className="mt-6 sm:mt-10 flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            
            {/* Slide Dots & Counter */}
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8DFD5] shadow-xs">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? 'w-7 bg-[#7B111A]'
                      : 'w-2.5 bg-[#2A1612]/25 hover:bg-[#2A1612]/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
              <span className="text-xs font-semibold text-[#8C7567] ml-1.5 font-mono">
                {currentIndex + 1} / {slideCount}
              </span>
            </div>

            {/* Prev & Next Arrow Buttons on Bottom Right */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-2 sm:p-2.5 rounded-full bg-white text-[#2A1612] shadow-md border border-[#E8DFD5] hover:bg-[#FAF3EB] hover:text-[#7B111A] transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-2 sm:p-2.5 rounded-full bg-white text-[#2A1612] shadow-md border border-[#E8DFD5] hover:bg-[#FAF3EB] hover:text-[#7B111A] transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
