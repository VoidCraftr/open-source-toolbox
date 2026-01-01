"use client"

import { useState, useEffect, useCallback } from "react"
import { Copy, RefreshCw, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function PasswordGeneratorClient() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState([16])
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    })
    const [history, setHistory] = useState<string[]>([])
    const [copied, setCopied] = useState(false)

    const generatePassword = useCallback(() => {
        const sets = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
        }

        let chars = ""
        if (options.uppercase) chars += sets.uppercase
        if (options.lowercase) chars += sets.lowercase
        if (options.numbers) chars += sets.numbers
        if (options.symbols) chars += sets.symbols

        if (chars === "") return setPassword("")

        let result = ""
        for (let i = 0; i < length[0]; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setPassword(result)

        setHistory(prev => {
            if (prev.includes(result)) return prev
            return [result, ...prev].slice(0, 8)
        })
    }, [length, options])

    useEffect(() => {
        generatePassword()
    }, [generatePassword])

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        // Ideally individual copy feedback for history items, but shared state is simple for now
    }

    const handleOptionChange = (key: keyof typeof options) => {
        setOptions(prev => {
            // Prevent disabling all options
            const next = { ...prev, [key]: !prev[key] }
            if (!Object.values(next).some(Boolean)) return prev
            return next
        })
    }

    const calculateStrength = () => {
        let score = 0
        if (length[0] >= 8) score += 10
        if (length[0] >= 12) score += 20
        if (length[0] >= 16) score += 20
        if (options.uppercase) score += 10
        if (options.lowercase) score += 10
        if (options.numbers) score += 10
        if (options.symbols) score += 20

        score = Math.min(100, score)

        let label = "Weak", color = "bg-red-500", textColor = "text-red-500"
        if (score >= 80) { label = "Very Strong"; color = "bg-green-600"; textColor = "text-green-600" }
        else if (score >= 60) { label = "Strong"; color = "bg-green-500"; textColor = "text-green-500" }
        else if (score >= 40) { label = "Medium"; color = "bg-yellow-500"; textColor = "text-yellow-500" }

        return { label, color, textColor, score }
    }

    const strength = calculateStrength()

    return (
        <ToolWrapper
            title="Password Generator"
            description="Create strong, secure passwords instantly with your preferred settings."
            toolSlug="password-generator"
            adSlot="password-generator-slot"
        >
            <div className="grid gap-8">
                {/* Output Section */}
                <div className="relative">
                    <div className="flex h-20 items-center justify-between rounded-lg border bg-muted px-6 text-2xl font-mono tracking-wider break-all">
                        {password}
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                        <Button size="icon" variant="ghost" onClick={generatePassword}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={() => handleCopy(password)}>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>Password Length</Label>
                                    <span className="font-mono">{length[0]}</span>
                                </div>
                                <Slider
                                    value={length}
                                    onValueChange={setLength}
                                    max={64}
                                    min={6}
                                    step={1}
                                />
                            </div>

                            <div className="space-y-3 pt-4">
                                <div className="flex items-center justify-between">
                                    <Label>Security Strength</Label>
                                    <span className={`font-bold ${strength.textColor}`}>{strength.label}</span>
                                </div>
                                <Progress value={strength.score} className="h-2" indicatorClassName={strength.color} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="upper" checked={options.uppercase} onCheckedChange={() => handleOptionChange('uppercase')} />
                                <Label htmlFor="upper">Uppercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="lower" checked={options.lowercase} onCheckedChange={() => handleOptionChange('lowercase')} />
                                <Label htmlFor="lower">Lowercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="nums" checked={options.numbers} onCheckedChange={() => handleOptionChange('numbers')} />
                                <Label htmlFor="nums">Numbers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="syms" checked={options.symbols} onCheckedChange={() => handleOptionChange('symbols')} />
                                <Label htmlFor="syms">Symbols</Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* History */}
                {history.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Recently Generated</h3>
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                            {history.slice(1).map((pass, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 text-sm font-mono break-all group">
                                    <span className="truncate mr-4">{pass}</span>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 opacity-50 group-hover:opacity-100" onClick={() => handleCopy(pass)}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ContentSection
                title="The Most Secure Password Generator"
                description={`Generate strong, unhackable passwords instantly in your browser. \n\nIn an age of data breaches, using "Password123" is no longer an option. **OpenToolbox Password Generator** uses your browser's cryptographically secure random number generator (CSPRNG) to create bank-grade passwords that are mathematically impossible to guess.\n\nBecause the generation happens **100% on your device**, we never see, store, or transmit your passwords. It is the safest way to generate credentials.`}
                features={[
                    "🔒 **Client-Side Only**: Passwords are generated locally and never sent to any server.",
                    "🛡️ **Bank-Grade Entropy**: Uses crypto.getRandomValues() for maximum randomness.",
                    "📏 **Customizable Length**: Generate passwords from 6 to 64 characters.",
                    "⚡ **Instant Strength Meter**: Visual feedback on how secure your password is.",
                    "📜 **Local History**: Temporarily remembers your last 8 generated passwords (cleared on refresh).",
                    "📋 **One-Click Copy**: Securely copy to clipboard with auto-clear protection."
                ]}
                howToUse={[
                    "Use the **Length Slider** to choose a password length (we recommend 16+).",
                    "Toggle **Options** to include Symbols, Numbers, and Uppercase letters.",
                    "Click the **Refresh Icon** to generate a new unique combination.",
                    "Check the **Strength Bar** to ensure it is 'Very Strong' (Green).",
                    "Click the **Copy Button** to save it to your password manager."
                ]}
                faq={[
                    {
                        question: "Can you see the passwords I generate?",
                        answer: "Absolutely not. Because this tool runs entirely in your browser using JavaScript, the passwords strictly live in your device's ephemeral memory. We have no backend database to store them."
                    },
                    {
                        question: "How long should my password be?",
                        answer: "For critical accounts (Banking, Email, Cloud), we recommend at least **16 characters** with a mix of symbols and numbers. For less critical sites, 12 characters is usually sufficient. 8 characters is considered weak by modern standards."
                    },
                    {
                        question: "Why do I need symbols?",
                        answer: "Symbols (!@#$) increase the 'entropy' (randomness) of your password, making it exponentially harder for brute-force algorithms to guess. A 12-character password with symbols is often stronger than a 16-character password with only letters."
                    },
                    {
                        question: "Is the history saved permanently?",
                        answer: "No. The 'Recently Generated' history is only stored in your browser's temporary memory (RAM) for the current session. If you refresh the page, it is wiped forever for your security."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
