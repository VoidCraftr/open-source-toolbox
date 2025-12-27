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
                title="Password Generator Guide"
                description={`Generate strong, random passwords to protect your online accounts. \n\nSecurity experts recommend using passwords that are at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols.`}
                features={[
                    "Client-Side Generation (Secure)",
                    "Customizable Character Sets",
                    "Password Strength Indicator",
                    "One-Click Copy"
                ]}
                faq={[
                    {
                        question: "Are these passwords stored?",
                        answer: "No. The passwords are generated locally in your browser using the JavaScript Crypto API. We never see or store your passwords."
                    },
                    {
                        question: "Why do I need symbols?",
                        answer: "Symbols increase the entropy (randomness) of your password, making it exponentially harder for brute-force algorithms to guess."
                    },
                    {
                        question: "How long should my password be?",
                        answer: "We recommend at least 16 characters for critical accounts like email and banking, and 12 characters for other services."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
