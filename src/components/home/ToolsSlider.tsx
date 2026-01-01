"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Tool {
    name: string;
    slug: string;
    icon: any;
}

interface ToolsSliderProps {
    tools: Tool[];
    direction?: "left" | "right";
    duration?: number;
}

export const ToolsSlider = ({ tools, direction = "left", duration = 40 }: ToolsSliderProps) => {
    // Triple the tools to ensure smooth infinite scrolling without gaps
    const duplicatedTools = [...tools, ...tools, ...tools];

    return (
        <div className="w-full relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
            <motion.div
                className="flex gap-4 w-max"
                animate={{
                    x: direction === "left" ? "-33.33%" : "0%",
                }}
                initial={{
                    x: direction === "left" ? "0%" : "-33.33%"
                }}
                transition={{
                    duration: duration,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {duplicatedTools.map((tool, idx) => (
                    <Link
                        key={`${tool.slug}-${idx}`}
                        href={`/tools/${tool.slug}`}
                        className="group relative flex h-20 w-auto min-w-[180px] max-w-[240px] flex-row items-center justify-start gap-4 rounded-xl border border-white/5 bg-white/5 px-4 backdrop-blur-md transition-all hover:bg-white/10 hover:border-primary/20 hover:scale-105 hover:z-10"
                    >
                        <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                            <tool.icon className="h-5 w-5" />
                        </div>

                        <span className="text-sm font-medium text-foreground/90 whitespace-nowrap group-hover:text-primary transition-colors">
                            {tool.name}
                        </span>

                        {/* Subtle glow on hover */}
                        <div className="absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-primary/5 to-transparent" />
                    </Link>
                ))}
            </motion.div>
        </div>
    );
};
