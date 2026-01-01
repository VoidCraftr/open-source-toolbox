"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Footer } from "@/components/common/Footer"
import { MobileNav } from "@/components/layout/MobileNav"
import { ModeToggle } from "@/components/common/ModeToggle"
import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"

import { CommandMenu } from "@/components/common/CommandMenu"
import { Search, Github, Package2 } from "lucide-react"

export function Shell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [commandOpen, setCommandOpen] = useState(false)

    return (
        <div className="relative flex min-h-screen">
            <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                    isCollapsed ? "md:pl-[60px]" : "md:pl-64 lg:pl-72"
                )}
            >
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background/60 backdrop-blur-xl border-b border-white/5 px-4 md:px-6 transition-all">
                    <div className="md:hidden flex items-center gap-3">
                        <MobileNav />
                        <Link href="/" className="flex items-center gap-2">
                            <Package2 className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg tracking-tight">OpenToolBox</span>
                        </Link>
                    </div>

                    {/* Search Trigger */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex items-center gap-2 w-full max-w-[240px] text-muted-foreground justify-start bg-muted/20 hover:bg-muted/40 border-primary/10 transition-all active:scale-95"
                        onClick={() => setCommandOpen(true)}
                    >
                        <Search className="h-4 w-4" />
                        <span className="inline-flex">Search tools...</span>
                        <kbd className="pointer-events-none ml-auto h-5 select-none items-center gap-1 rounded border bg-muted/50 px-1.5 font-mono text-[10px] font-medium opacity-100 flex">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </Button>

                    <div className="flex-1 flex justify-center">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link href="/tools" className="transition-colors hover:text-primary text-muted-foreground/80 hover:scale-105 active:scale-95 duration-200">
                                All Tools
                            </Link>
                            <Link href="/about" className="transition-colors hover:text-primary text-muted-foreground/80 hover:scale-105 active:scale-95 duration-200">
                                About
                            </Link>
                            <Link href="/contact" className="transition-colors hover:text-primary text-muted-foreground/80 hover:scale-105 active:scale-95 duration-200">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href="/support">
                            <Button variant="outline" size="sm" className="hidden premium-button border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20 md:flex">
                                <Coffee className="mr-2 h-4 w-4" />
                                Buy Coffee
                            </Button>
                        </Link>
                        <div className="h-4 w-px bg-border/50 mx-2 hidden md:block" />
                        <a href="https://github.com/voidcraftr/OpenToolBox" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200">
                            <span className="sr-only">GitHub</span>
                            <Github className="h-5 w-5" />
                        </a>
                        <ModeToggle />
                    </div>
                </header>

                <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
                <main className="flex-1 container py-2 md:py-6 max-w-7xl mx-auto animate-fade-in">{children}</main>
                <Footer />
            </div>
        </div>
    )
}
