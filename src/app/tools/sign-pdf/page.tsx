import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { constructMetadata } from "@/lib/seo"
import { DynamicSignPdf } from "./components/DynamicSignPdf"
import { ContentSection } from "@/components/tools/ContentSection"

export const metadata = constructMetadata({
    title: "Free Online PDF Signer | Sign Documents Digitally",
    description: "Upload and sign PDF documents online for free. Add your digital signature to any page, or apply to all pages instantly. No watermarks. 100% Client-side privacy.",
    keywords: ["sign pdf", "pdf signer", "add signature to pdf", "free pdf tool", "electronic signature", "sign document online", "no signup pdf signer"]
})

export default function SignPdfPage() {
    return (
        <ToolWrapper
            title="Sign PDF Online"
            description="Upload your PDF and add your digital signature to any page instantly."
            toolSlug="sign-pdf"
        >
            <DynamicSignPdf />

            <ContentSection
                title="The Easiest Way to Sign PDFs Online"
                description={`Sign contracts, agreements, and forms in seconds without printing or scanning. \n\n**OpenToolbox PDF Signer** allows you to securely add your signature to any PDF document directly in your browser. Unlike other services that force you to upload your sensitive files to a server, we process everything **locally on your device**.\n\nYour contracts never leave your computer, ensuring **100% privacy and security**.`}
                features={[
                    "🔒 **100% Private**: Your files are processed locally in your browser, not on our servers.",
                    "✍️ **Multiple Signatures**: Upload an image or draw your signature freshly.",
                    "📑 **Multi-Page Support**: Apply your signature to one page or all pages at once.",
                    "🚫 **No Watermarks**: Download professional, clean documents for free.",
                    "⚡ **Instant Download**: No email required. Get your signed file correctly."
                ]}
                howToUse={[
                    "Click **Select PDF** to open the document you want to sign.",
                    "Navigate to the correct page using the pagination controls.",
                    "Click **Upload Signature** (Image) or use the Draw tool (if available).",
                    "Drag and drop the signature to the correct position on the page.",
                    "Click **Download Signed PDF** to save your finalized document."
                ]}
                faq={[
                    {
                        question: " Is this electronic signature legally binding?",
                        answer: "In many jurisdictions (like the US ESIGN Act and EU eIDAS), simple electronic signatures are legally binding for most business contracts. However, for highly regulated documents (like wills or real estate deeds), you may need a specialized digital certificate."
                    },
                    {
                        question: "Do you store my documents?",
                        answer: "No. This tool runs entirely in your browser. Your PDF document is never uploaded to our servers, so we cannot read, store, or share your files."
                    },
                    {
                        question: "Can I sign multiple pages at once?",
                        answer: "Yes! Use the 'Apply to All Pages' feature to automatically place your signature in the same position on every single page of the document."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
