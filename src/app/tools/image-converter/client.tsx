"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Download, Image as ImageIcon, RefreshCcw, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function ImageConverterClient() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [format, setFormat] = useState("image/png")
    const [quality, setQuality] = useState([0.9])
    const [isConverting, setIsConverting] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
    const [stats, setStats] = useState<{ original: string, compressed: string, saved: string } | null>(null)

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
            setConvertedUrl(null)
            setStats(null)

            const reader = new FileReader()
            reader.onload = (ev) => {
                setPreview(ev.target?.result as string)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleConvert = () => {
        if (!file || !preview) return

        setIsConverting(true)
        const img = new Image()
        img.src = preview
        img.onload = () => {
            const canvas = canvasRef.current
            if (canvas) {
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    ctx.drawImage(img, 0, 0)

                    // Quality only applies to jpeg/webp
                    const q = (format === "image/jpeg" || format === "image/webp") ? quality[0] : undefined
                    const newUrl = canvas.toDataURL(format, q)

                    setConvertedUrl(newUrl)

                    // Calculate sizes
                    const head = `data:${format};base64,`
                    const size = Math.round((newUrl.length - head.length) * 3 / 4)
                    const savedBytes = file.size - size
                    const savedPercent = Math.round((savedBytes / file.size) * 100)

                    setStats({
                        original: formatSize(file.size),
                        compressed: formatSize(size),
                        saved: savedBytes > 0 ? `-${savedPercent}%` : '+0%'
                    })

                    setIsConverting(false)
                }
            }
        }
    }

    const handleDownload = () => {
        if (convertedUrl) {
            const link = document.createElement("a")
            link.download = `converted.${format.split("/")[1]}`
            link.href = convertedUrl
            link.click()
        }
    }

    return (
        <ToolWrapper
            title="Image Converter"
            description="Convert images between different formats securely."
            toolSlug="image-converter"
            adSlot="image-converter-slot"
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="rounded-lg border border-dashed p-8 text-center hover:bg-muted/50 transition-colors">
                        <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-lg font-medium">Click to upload image</span>
                            <span className="text-sm text-muted-foreground">Supports JPG, PNG, WebP</span>
                        </Label>
                        <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {preview && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Target Format</Label>
                            <Select value={format} onValueChange={setFormat}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="image/png">PNG (Lossless)</SelectItem>
                                    <SelectItem value="image/jpeg">JPEG (Good Compression)</SelectItem>
                                    <SelectItem value="image/webp">WebP (Best Compression)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(format === "image/jpeg" || format === "image/webp") && (
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between">
                                    <Label>Quality / Compression</Label>
                                    <span className="text-sm font-mono">{Math.round(quality[0] * 100)}%</span>
                                </div>
                                <Slider
                                    value={quality}
                                    onValueChange={setQuality}
                                    min={0.1}
                                    max={1.0}
                                    step={0.05}
                                    className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground">Lower quality = Smaller file size</p>
                            </div>
                        )}
                    </div>

                    <Button onClick={handleConvert} disabled={!file || isConverting} className="w-full">
                        {isConverting ? (
                            <>
                                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                                Converting...
                            </>
                        ) : (
                            <>
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Convert Now
                            </>
                        )}
                    </Button>

                    {convertedUrl && (
                        <div className="rounded-md border p-6 bg-muted/50 text-center space-y-4 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium">
                                <Check className="h-5 w-5" /> Conversion Successful!
                            </div>

                            {stats && (
                                <div className="grid grid-cols-3 gap-2 text-sm bg-background/50 p-3 rounded-lg">
                                    <div>
                                        <div className="text-muted-foreground text-xs">Original</div>
                                        <div className="font-bold">{stats.original}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-xs">New Size</div>
                                        <div className="font-bold">{stats.compressed}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-xs">Saved</div>
                                        <div className="font-bold text-green-500">{stats.saved}</div>
                                    </div>
                                </div>
                            )}

                            <Button onClick={handleDownload} variant="default" className="w-full">
                                <Download className="mr-2 h-4 w-4" /> Download Image
                            </Button>
                        </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                </div>
            </div>

            <ContentSection
                title="The Most Secure Online Image Converter"
                description={`Convert images instantly in your browser **without uploading files to any server**. \n\nMost online converters upload your personal photos to a remote cloud server to process them. This creates privacy risks and slows down the process. **OpenToolbox Image Converter** is different. We use advanced HTML5 Canvas technology to read, process, and convert your images **locally on your device**.\n\nThis ensures **100% privacy**, zero data usage for uploading, and lightning-fast speeds compared to traditional server-side converters.`}
                features={[
                    "🔒 **Zero Server Uploads**: Your photos never leave your device.",
                    "🖼️ **Multi-Format Support**: Convert between JPG, PNG, and WebP instantly.",
                    "⚡ **Real-Time Preview**: See changes immediately before downloading.",
                    "📉 **Smart Compression**: Adjust quality to reduce file size by up to 80%.",
                    "🚀 **No Limits**: Convert as many images as you want, of any size.",
                    "✨ **Transparency Support**: Preserves transparent backgrounds for PNG and WebP."
                ]}
                howToUse={[
                    "Click the upload box or **Drag & Drop** your image file.",
                    "Select your target format (e.g., **WebP** for websites, **JPG** for photos).",
                    "Use the **Quality Slider** to balance file size vs. image clarity.",
                    "Check the **'Saved'** stat to see how much space you are saving.",
                    "Click **Download Image** to save the optimized file instantly."
                ]}
                faq={[
                    {
                        question: "Does this tool support transparent PNGs?",
                        answer: "Yes! If you convert to PNG or WebP, **transparency is fully preserved**. However, converting to JPEG will replace transparent areas with a white background because JPEG does not support transparency."
                    },
                    {
                        question: "Why should I convert to WebP?",
                        answer: "**WebP** is a modern image format that provides superior compression for images on the web. WebP images are typically **25-34% smaller** than comparable JPEG and PNG images, making your website load much faster."
                    },
                    {
                        question: "Is there a daily limit?",
                        answer: "No. Since the conversion happens on your own device, there are **no artificial limits**. You can convert hundreds of images without hitting a paywall."
                    },
                    {
                        question: "Will I lose image quality?",
                        answer: "It depends on your settings. If you convert PNG to PNG, it is lossless (no quality loss). If you convert to JPEG/WebP, you can control the quality slider. We recommend **80-90% quality** for the best balance of size and clarity."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
