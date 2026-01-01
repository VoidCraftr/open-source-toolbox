"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { tools } from "@/config/tools"
import { cn } from "@/lib/utils"

interface RelatedToolsProps {
    currentSlug: string
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
    const currentTool = tools.find(t => t.slug === currentSlug)

    if (!currentTool) return null

    // Find tools in the same category, excluding current
    let suggestions = tools
        .filter(t => t.category === currentTool.category && t.slug !== currentSlug)
        // Deterministic sort by name (stable) instead of random
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 3)

    // Fallback: If not enough related tools, fill with popular tools
    if (suggestions.length < 3) {
        const popular = tools
            .filter(t => t.isPopular && t.slug !== currentSlug && !suggestions.includes(t))
            .slice(0, 3 - suggestions.length)
        suggestions = [...suggestions, ...popular]
    }

    if (suggestions.length === 0) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Related Tools</h3>
                <Link href="/tools" className="text-sm font-medium text-primary hover:underline flex items-center">
                    View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                {suggestions.map((tool) => {
                    const Icon = tool.icon
                    return (
                        <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="group block h-full"
                        >
                            <div className="relative h-full overflow-hidden rounded-xl border border-white/5 bg-muted/20 p-5 transition-all hover:border-primary/20 hover:bg-muted/40 hover:-translate-y-1">
                                <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {tool.name}
                                </h4>
                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                    {tool.description}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
