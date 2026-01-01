import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
    question: string
    answer: string
}

interface ContentSectionProps {
    title: string
    description?: string
    features?: string[]
    howToUse?: string[]
    faq?: FaqItem[]
}

export function ContentSection({ title, description, features, howToUse, faq }: ContentSectionProps) {
    // Helper to render text with bold markdown support (**text**)
    const renderText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="mt-16 space-y-12 max-w-4xl mx-auto">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{title}</h2>
                {description && (
                    <div className="text-muted-foreground leading-relaxed text-lg space-y-4">
                        {description.split('\n').map((paragraph, i) => (
                            paragraph.trim() && <p key={i}>{renderText(paragraph)}</p>
                        ))}
                    </div>
                )}
            </div>

            {features && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Key Features</h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground/90 p-3 rounded-lg bg-muted/30 border border-transparent hover:border-primary/10 transition-colors">
                                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary shadow shadow-primary/50" />
                                <span className="text-base">{renderText(feature)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {howToUse && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">How to Use</h3>
                    <div className="grid gap-4">
                        {howToUse.map((step, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/20 border border-white/5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-inset ring-primary/20">
                                    {i + 1}
                                </span>
                                <p className="pt-1 text-muted-foreground text-base">{renderText(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {faq && faq.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                        {faq.map((item, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-white/5">
                                <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    {renderText(item.answer)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            )}
        </div>
    )
}
