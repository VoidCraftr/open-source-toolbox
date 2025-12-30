import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { SvgConverter } from "./components/SvgConverter"

export const metadata: Metadata = {
    title: "Free SVG to PNG/JPG Converter | High Resolution | OpenToolBox",
    description: "Convert SVG vector files to high-quality PNG or JPG images online. Customize scale and resolution. No upload to server - 100% client-side private.",
    keywords: ["svg to png", "svg to jpg", "convert svg", "vector converter", "high res svg export"],
}

export default function SvgConverterPage() {
    return (
        <ToolWrapper
            title="SVG to PNG Converter"
            description="Convert your SVG vectors to raster images (PNG/JPG) securely in your browser."
            toolSlug="svg-to-png"
        >
            <SvgConverter />

            <div className="mt-12 space-y-8 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">How to convert SVG to Image?</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Upload: Select your .svg file.</li>
                        <li>Scale: Increase the scale factor (2x, 4x) to get a higher resolution image without blur.</li>
                        <li>Format: Choose PNG for transparency or JPG for a smaller file size (white background).</li>
                        <li>Privacy: Conversion happens entirely in your browser. Your files are never sent to our servers.</li>
                    </ul>
                </section>
            </div>
        </ToolWrapper>
    )
}
