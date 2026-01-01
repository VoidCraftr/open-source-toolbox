"use client"

import { useState } from "react"
import { Copy, RefreshCw, Check } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ContentSection } from "@/components/tools/ContentSection"

const HASHTAG_SETS: Record<string, string[]> = {
    popular: ["#instagood", "#photooftheday", "#fashion", "#beautiful", "#happy", "#cute", "#tbt", "#like4like", "#followme", "#picoftheday", "#follow", "#me", "#selfie", "#summer", "#art", "#instadaily", "#friends", "#repost", "#nature", "#girl", "#fun", "#style", "#smile", "#food"],
    travel: ["#travel", "#travelgram", "#travelphotography", "#instatravel", "#traveling", "#travelling", "#travelblogger", "#wanderlust", "#trip", "#nature", "#vacation", "#adventure", "#explore", "#traveler", "#landscape", "#photooftheday", "#traveltheworld", "#photography", "#holiday", "#roadtrip"],
    food: ["#food", "#foodporn", "#yum", "#instafood", "#yummy", "#amazing", "#instagood", "#photooftheday", "#sweet", "#dinner", "#lunch", "#breakfast", "#fresh", "#tasty", "#food", "#delish", "#delicious", "#eating", "#foodpic", "#foodie", "#hungry"],
    tech: ["#technology", "#tech", "#innovation", "#engineering", "#business", "#iphone", "#science", "#design", "#apple", "#android", "#gadgets", "#electronics", "#smartphone", "#programming", "#software", "#coding", "#computer", "#pro", "#instatech", "#education"],
    fitness: ["#fitness", "#gym", "#workout", "#fit", "#fitnessmotivation", "#motivation", "#bodybuilding", "#training", "#health", "#fitfam", "#lifestyle", "#sport", "#love", "#healthy", "#healthylifestyle", "#crossfit", "#personaltrainer", "#exercise", "#muscle", "#weightloss"],
    art: ["#art", "#artist", "#drawing", "#artwork", "#painting", "#love", "#illustration", "#sketch", "#photography", "#arte", "#design", "#instagood", "#artistsoninstagram", "#fashion", "#instaart", "#beautiful", "#photooftheday", "#creative", "#nature", "#style"],
    nature: ["#nature", "#photography", "#love", "#travel", "#landscape", "#beautiful", "#naturephotography", "#photooftheday", "#instagood", "#view", "#photo", "#summer", "#sky", "#clouds", "#mountains", "#sunset", "#naturelovers", "#outdoors", "#explore", "#adventure"]
}

export default function InstagramHashtagsClient() {
    const [category, setCategory] = useState("popular")
    const [hashtags, setHashtags] = useState(HASHTAG_SETS["popular"].join(" "))
    const [copied, setCopied] = useState(false)

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        setHashtags(HASHTAG_SETS[value].join(" "))
        setCopied(false)
    }

    const handleGenerate = () => {
        // Randomize the current set
        const currentSet = HASHTAG_SETS[category];
        const shuffled = [...currentSet].sort(() => 0.5 - Math.random());
        setHashtags(shuffled.join(" "));
        setCopied(false)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(hashtags)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolWrapper
            title="Instagram Hashtag Generator"
            description="Boost your reach with trending hashtags for any niche."
            toolSlug="instagram-hashtags"
        >
            <div className="grid gap-8 max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Hashtags</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Select Category</Label>
                            <Select value={category} onValueChange={handleCategoryChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a niche" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                    <SelectItem value="travel">Travel</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="tech">Technology</SelectItem>
                                    <SelectItem value="fitness">Fitness</SelectItem>
                                    <SelectItem value="art">Art & Design</SelectItem>
                                    <SelectItem value="nature">Nature</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label>Hashtags</Label>
                                <span className="text-xs text-muted-foreground">{hashtags.split(" ").length} tags</span>
                            </div>
                            <Textarea
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                                className="min-h-[150px] font-mono text-sm leading-relaxed"
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={handleGenerate} variant="outline" className="flex-1">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Shuffle
                            </Button>
                            <Button onClick={handleCopy} className="flex-1">
                                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                                {copied ? "Copied!" : "Copy to Clipboard"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <ContentSection
                    title="How to use Instagram Hashtags"
                    description="Boost your engagement by using the right hashtags. Our tool provides curated sets of popular tags for various niches (Travel, Food, Tech, etc.) to help your posts reach a wider audience."
                    features={[
                        "Curated Lists for Top Niches",
                        "One-Click Copy",
                        "Shuffle Feature for Variety",
                        "Instant Hashtag Counts"
                    ]}
                    faq={[
                        {
                            question: "How many hashtags should I use?",
                            answer: "Instagram allows up to 30 hashtags per post. However, using 5-15 highly relevant tags is often more effective than spamming 30 random ones."
                        },
                        {
                            question: "Are these hashtags updated?",
                            answer: "We periodically update our lists to include evergreen trending tags for each category."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
