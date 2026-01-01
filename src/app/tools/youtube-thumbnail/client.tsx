"use client"

import { useState } from "react"
import { Download, Search } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ContentSection } from "@/components/tools/ContentSection"

export default function YoutubeThumbnailClient() {
    const [url, setUrl] = useState("")
    const [videoId, setVideoId] = useState<string | null>(null)

    const extractVideoId = (inputUrl: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    }

    const handleFetch = () => {
        const id = extractVideoId(url)
        if (id) {
            setVideoId(id)
        } else {
            alert("Invalid YouTube URL")
        }
    }

    const thumbnailQualities = [
        { label: "Max Resolution (HD)", key: "maxresdefault", size: "1280x720" },
        { label: "Standard Definition (SD)", key: "sddefault", size: "640x480" },
        { label: "High Quality (HQ)", key: "hqdefault", size: "480x360" },
        { label: "Medium Quality (MQ)", key: "mqdefault", size: "320x180" },
    ]

    return (
        <ToolWrapper
            title="YouTube Thumbnail Downloader"
            description="Download high-quality thumbnails from any YouTube video in seconds."
            toolSlug="youtube-thumbnail"
        >
            <div className="grid gap-8">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="url">YouTube Video URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="url"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                                />
                                <Button onClick={handleFetch}>
                                    <Search className="mr-2 h-4 w-4" />
                                    Fetch
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {videoId && (
                    <div className="grid gap-6 md:grid-cols-2">
                        {thumbnailQualities.map((quality) => (
                            <Card key={quality.key} className="overflow-hidden">
                                <div className="aspect-video relative bg-muted flex items-center justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`https://img.youtube.com/vi/${videoId}/${quality.key}.jpg`}
                                        alt={quality.label}
                                        className="object-cover w-full h-full"
                                        onError={(e) => {
                                            if (quality.key === "maxresdefault") {
                                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                            }
                                        }}
                                    />
                                </div>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{quality.label}</p>
                                        <p className="text-xs text-muted-foreground">{quality.size}</p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild>
                                        <a href={`https://img.youtube.com/vi/${videoId}/${quality.key}.jpg`} download={`thumbnail-${quality.key}.jpg`} target="_blank" rel="noopener noreferrer">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <ContentSection
                    title="How to Download YouTube Thumbnails"
                    description="Our tool allows you to easily extract and save the thumbnail image from any YouTube video in multiple resolutions (HD, HQ, 1080p, 4K)."
                    features={[
                        "Supports Full HD (1080p) & 4K Thumbnails",
                        "Extracts Default, Medium, and High Quality Variants",
                        "No Registration Required",
                        "Direct Download Link"
                    ]}
                    faq={[
                        {
                            question: "Is it free to use?",
                            answer: "Yes, this tool is completely free and unlimited."
                        },
                        {
                            question: "Where do I find the YouTube URL?",
                            answer: "Simply copy the link from your browser's address bar while watching the video, or use the 'Share' button on YouTube."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
