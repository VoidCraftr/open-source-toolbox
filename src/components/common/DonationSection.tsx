"use client"

import Link from "next/link"
import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"


export function DonationSection() {
    return (
        <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600/10 via-background to-blue-600/10 border border-border/50 p-6 sm:p-8">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 min-h-[140px]">
                {/* 3D Pixel Art Animation Container */}
                <div className="relative group shrink-0">
                    <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500 animate-pulse" />
                    <div className="relative h-24 w-24 sm:h-32 sm:w-32 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {/* Using standard img tag for immediate preview, generally Next.js Image is preferred but this ensures no config issues with external domains if any */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/dev-coding.png"
                            alt="Developer Coding"
                            className="w-full h-full object-contain drop-shadow-2xl animate-float"
                            style={{ animation: 'float 6s ease-in-out infinite' }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 z-10 flex-1">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
                            Fuel the Development!
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto sm:mx-0">
                            OpenToolBox is free, open-source, and privacy-focused. Help us keep the servers coding hard! 🚀
                        </p>
                    </div>

                    <Link href="https://www.buymeacoffee.com/voidcraftr" target="_blank" rel="noopener noreferrer">
                        <Button className="font-semibold bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:-translate-y-1">
                            <Coffee className="mr-2 h-4 w-4" />
                            Buy Me a Coffee
                        </Button>
                    </Link>
                </div>
            </div>

            {/* CSS Animation Keyframes */}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    )
}
