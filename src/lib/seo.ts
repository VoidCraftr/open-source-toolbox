import { Metadata } from "next";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    image?: string;
}

export function constructMetadata({
    title,
    description,
    keywords = [],
    canonical,
    image = "/og-image.png", // We can add a default image later
}: SEOProps): Metadata {
    return {
        title: {
            default: `${title} - Free & Secure Tools | OpenToolbox`,
            template: `%s - OpenToolbox`,
        },
        description,
        keywords: [
            "developer tools",
            "free online tools",
            "privacy focused",
            "secure client-side tools",
            "no-tracking utilities",
            "web dev productivity",
            "pdf tools free",
            "image converter online",
            ...keywords,
        ],
        authors: [{ name: "VoidCraftr", url: "https://opentoolbox.online" }],
        creator: "VoidCraftr",
        openGraph: {
            title: `${title} - OpenToolbox`,
            description,
            type: "website",
            siteName: "OpenToolbox",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - OpenToolbox`,
            description,
            images: [image],
            creator: "@voidcraftr",
        },
        metadataBase: new URL("https://opentoolbox.online"),
        alternates: {
            canonical: canonical,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}
