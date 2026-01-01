import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { constructMetadata } from "@/lib/seo"
import { CreateSignature } from "./components/CreateSignature"
import { ContentSection } from "@/components/tools/ContentSection"

export const metadata = constructMetadata({
    title: "Free Signature Generator | Draw & Type Signatures",
    description: "Create professional digital signatures online for free. Draw your signature or type it with handwriting fonts. Transparency supported. Privacy focused.",
    keywords: ["signature generator", "make signature", "draw signature", "signature fonts", "digital signature creator", "transparent signature", "online signature maker"]
})

export default function SignatureGeneratorPage() {
    return (
        <ToolWrapper
            title="Digital Signature Generator"
            description="Create your professional digital signature by drawing or typing in seconds."
            toolSlug="signature-generator"
        >
            <CreateSignature />

            <ContentSection
                title="Create a Professional Digital Signature"
                description={`Need a signature for your email footer, contract, or website? **OpenToolbox Signature Generator** makes it easy to create high-quality, transparent signatures in seconds.\n\nChoose between **Drawing Mode** for a personal touch (works great on tablets!) or **Type Mode** to select from our premium handwriting fonts. Download instantly as a transparent PNG.`}
                features={[
                    "✍️ **Draw & Type**: Two modes to create the perfect look.",
                    "🎨 **Custom Colors**: Match your brand with custom hex color support.",
                    "🖼️ **Transparent Background**: Perfect for overlaying on documents and emails.",
                    "📱 **Touch Friendly**: Optimized for drawing on tablets and mobile screens.",
                    "🔒 **Private**: Signatures are generated locally and never saved to our servers."
                ]}
                howToUse={[
                    "Choose **Draw** to use your mouse/finger or **Type** to use our fonts.",
                    "Adjust the **Color** and **Size/Width** sliders to your preference.",
                    "If Drawing: Use the 'Smoothening' option for cleaner lines.",
                    "If Typing: Cycle through the available **Handwriting Fonts**.",
                    "Click **Download Signature** to save the transparent PNG file."
                ]}
                faq={[
                    {
                        question: "Can I use this signature for legal documents?",
                        answer: "Yes, you can use the image as a visual representation of your signature in most electronic documents. Combined with an e-sign tool (like our 'Sign PDF Online' tool), it is legally valid in many contexts."
                    },
                    {
                        question: "Is the background transparent?",
                        answer: "Yes! By default, the downloaded PNG image has a transparent background, so you can place it cleanly over any white or colored document without a box around it."
                    },
                    {
                        question: "Are my signatures saved?",
                        answer: "No. For your privacy, we do not store your signatures on our servers. Once you close the page, your drawing is deleted from memory."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
