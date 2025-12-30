import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { SocialPreview } from "./components/SocialPreview"

export const metadata: Metadata = {
    title: "Social Media Preview Tool | Check Open Graph & Meta Tags | OpenToolBox",
    description: "Preview how your website links look on Facebook, Twitter, LinkedIn, and Google. Debug Open Graph (OG) tags and SEO metadata instantly.",
    keywords: ["social media preview", "open graph checker", "twitter card validator", "facebook link preview", "seo preview tool"],
}

export default function SocialPreviewPage() {
    return (
        <ToolWrapper
            title="Social Media Link Preview"
            description="Visualize how your content appears on social networks and search engines."
            toolSlug="social-media-preview"
        >
            <SocialPreview />

            <div className="mt-12 space-y-8 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Why use a Social Media Previewer?</h2>
                    <p className="mb-4">
                        When you share a link on social media, the platform fetches metadata (Open Graph tags, Twitter Cards) to display a preview.
                        If these tags are missing or incorrect, your link might look broken or unappealing, reducing click-through rates.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Debug OG Tags: Ensure `og:title`, `og:image`, and `og:description` are correct.</li>
                        <li>Optimize CTR: A compelling preview image and title significantly increase engagement.</li>
                        <li>Cross-Platform Check: See previews for Facebook, Twitter, LinkedIn, and Google Search in one place.</li>
                    </ul>
                </section>
            </div>
        </ToolWrapper>
    )
}
