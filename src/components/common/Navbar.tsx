"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Package2 } from "lucide-react"
import { ModeToggle } from "@/components/common/ModeToggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image
                            src="/assets/OpenToolBox_Logo.png"
                            alt="OpenToolBox"
                            width={32}
                            height={32}
                            sizes="100vw"
                            className="w-auto h-8 shrink-0 rounded-sm"
                        />
                        <span className="hidden font-bold sm:inline-block">
                            OpenToolbox
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/tools"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            All Tools
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                            <Image
                                src="/assets/OpenToolBox_Logo.png"
                                alt="OpenToolBox"
                                width={32}
                                height={32}
                                sizes="100vw"
                                className="w-auto h-8 shrink-0 rounded-sm"
                            />
                            <span className="sr-only">OpenToolbox</span>
                        </Link>
                        <nav className="mt-8 flex flex-col gap-4">
                            <Link href="/" className="font-medium text-muted-foreground hover:text-foreground">
                                Home
                            </Link>
                            <Link href="/tools" className="font-medium text-muted-foreground hover:text-foreground">
                                All Tools
                            </Link>
                            <Link href="/about" className="font-medium text-muted-foreground hover:text-foreground">
                                About
                            </Link>
                            <Link href="/contact" className="font-medium text-muted-foreground hover:text-foreground">
                                Contact
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search Placeholder */}
                    </div>
                    <nav className="flex items-center gap-2">
                        <Link
                            href="https://github.com/voidcraftr"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button variant="ghost" size="icon">
                                <span className="font-bold">GH</span>
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </Link>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
