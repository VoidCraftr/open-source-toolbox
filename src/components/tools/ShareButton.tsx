"use client"

import { useState, useEffect } from "react"
import { Share2, Check, Copy, Share, Mail, Twitter, Linkedin, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
    title: string
    text: string
    url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
    const [copied, setCopied] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        toast.success("Link copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
    }

    const socialLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            color: "bg-[#1877F2]",
            onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
        },
        {
            name: "X (Twitter)",
            icon: Twitter,
            color: "bg-black dark:bg-white dark:text-black",
            onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "bg-[#0A66C2]",
            onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
        },
        {
            name: "Email",
            icon: Mail,
            color: "bg-gray-600",
            onClick: () => window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + shareUrl)}`
        },
        {
            name: "Copy Link",
            icon: copied ? Check : Copy,
            color: copied ? "bg-green-500" : "bg-primary",
            onClick: handleCopy
        }
    ]

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Share2 className="h-6 w-6 text-primary" />
                    </div>
                    <DialogDescription className="text-center font-medium text-muted-foreground pb-2">
                        You are currently sharing:
                    </DialogDescription>
                    <DialogTitle className="text-center text-xl font-bold">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-6 space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                        <Share className="h-16 w-16 text-primary/20 animate-pulse" />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {socialLinks.map((social) => {
                            const Icon = social.icon
                            return (
                                <button
                                    key={social.name}
                                    onClick={social.onClick}
                                    className={cn(
                                        "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2",
                                        social.color
                                    )}
                                    title={social.name}
                                >
                                    <Icon className="h-5 w-5" />
                                </button>
                            )
                        })}
                    </div>

                    <div className="w-full pt-4 border-t">
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <label htmlFor="link" className="sr-only">
                                    Link
                                </label>
                                <input
                                    id="link"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={shareUrl}
                                    readOnly
                                />
                            </div>
                            <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
                                <span className="sr-only">Copy</span>
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
