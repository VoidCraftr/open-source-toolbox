"use client"

import { useState, useRef } from "react"
import { Download, Image as ImageIcon, Heart, MessageCircle, Repeat } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContentSection } from "@/components/tools/ContentSection"

export default function TweetToImageClient() {
    const [name, setName] = useState("John Doe")
    const [username, setUsername] = useState("johndoe")
    const [content, setContent] = useState("Just setting up my Twitter... #hello")
    const [likes, setLikes] = useState("1.2K")
    const [retweets, setRetweets] = useState("450")
    const [verified, setVerified] = useState(true)
    const [theme, setTheme] = useState<"light" | "dark" | "dim">("dim")

    const tweetRef = useRef<HTMLDivElement>(null)

    // Placeholder for actual image generation (would need html2canvas)
    const handleDownload = () => {
        alert("Image generation requires html2canvas. For now, you can take a screenshot!")
    }

    return (
        <ToolWrapper
            title="Fake Tweet Generator"
            description="Create realistic looking tweet screenshots for memes or sharing."
            toolSlug="tweet-to-image"
        >
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="h-fit">
                    <CardContent className="p-6 space-y-4">
                        <CardTitle className="mb-4">Tweet Details</CardTitle>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                                    <Input value={username} onChange={(e) => setUsername(e.target.value)} className="pl-7" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tweet Content</Label>
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxLength={280}
                                className="h-24"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Likes</Label>
                                <Input value={likes} onChange={(e) => setLikes(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Retweets</Label>
                                <Input value={retweets} onChange={(e) => setRetweets(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Verified Badge</Label>
                            <Switch checked={verified} onCheckedChange={setVerified} />
                        </div>

                        <div className="space-y-2">
                            <Label>Theme</Label>
                            <div className="flex gap-2">
                                <Button size="sm" variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")} className="w-full">Light</Button>
                                <Button size="sm" variant={theme === "dim" ? "default" : "outline"} onClick={() => setTheme("dim")} className="w-full">Dim</Button>
                                <Button size="sm" variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")} className="w-full">Dark</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Preview Area */}
                <div className="space-y-4">
                    <Card className="p-8 bg-muted/20 flex items-center justify-center min-h-[400px]">
                        <div
                            ref={tweetRef}
                            className={`w-full max-w-md p-6 rounded-xl border shadow-xl ${theme === "light" ? "bg-white text-black border-gray-200" :
                                    theme === "dim" ? "bg-[#15202b] text-white border-gray-700" : "bg-black text-white border-gray-800"
                                }`}
                        >
                            <div className="flex gap-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
                                    <AvatarFallback>{name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold truncate">{name}</span>
                                        {verified && (
                                            <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-5 h-5 text-blue-400 fill-current">
                                                <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.483-.02.17-.032.34-.032.517 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g>
                                            </svg>
                                        )}
                                    </div>
                                    <div className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>@{username}</div>
                                </div>
                            </div>

                            <div className="mt-4 text-xl leading-normal whitespace-pre-wrap">
                                {content}
                            </div>

                            <div className={`mt-4 text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date().toLocaleDateString()}
                            </div>

                            <div className={`mt-4 py-3 border-t border-b ${theme === "light" ? "border-gray-100" : "border-gray-700/50"} flex gap-6 text-sm font-medium`}>
                                <div><span className={theme === "light" ? "text-black" : "text-white"}>{retweets}</span> <span className="text-gray-500">Retweets</span></div>
                                <div><span className={theme === "light" ? "text-black" : "text-white"}>{likes}</span> <span className="text-gray-500">Likes</span></div>
                            </div>

                            <div className={`mt-3 flex justify-around ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                                <MessageCircle className="w-5 h-5" />
                                <Repeat className="w-5 h-5" />
                                <Heart className="w-5 h-5 text-red-500 fill-red-500/10" />
                                <Download className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                    <div className="flex justify-center">
                        <p className="text-sm text-muted-foreground italic">Screenshot feature coming soon! Use your system screenshot tool for now.</p>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2">
                    <ContentSection
                        title="Fake Tweet Generator Guide"
                        description="Easily create convincing fake tweets for memes, jokes, or social media mockups. Customize every detail from the profile picture to the retweet count."
                        features={[
                            "Light, Dim, and Dark Mode Support",
                            "Custom Verification Badge",
                            "Real-time Preview",
                            "Adjustable Metrics (Likes, Retweets)"
                        ]}
                        faq={[
                            {
                                question: "Is this connected to Twitter?",
                                answer: "No, this is purely a visual generator. It does not post to Twitter/X."
                            },
                        ]}
                    />
                </div>
            </div>
        </ToolWrapper>
    )
}
