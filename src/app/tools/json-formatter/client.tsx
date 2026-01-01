"use client"

import { useState } from "react"
import { Copy, Trash2, ShieldCheck, Minimize, Maximize, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function JsonFormatterClient() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleFormat = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed, null, 2))
            setError(null)
        } catch (err) {
            setError("Invalid JSON: " + (err as Error).message)
            setOutput("")
        }
    }

    const handleMinify = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed))
            setError(null)
        } catch (err) {
            setError("Invalid JSON: " + (err as Error).message)
            setOutput("")
        }
    }

    const handleClear = () => {
        setInput("")
        setOutput("")
        setError(null)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(output)
    }

    const handleDownload = () => {
        if (!output) return
        const blob = new Blob([output], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "formatted.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleLoadSample = () => {
        const sample = {
            "project": "OpenToolbox",
            "version": 1.0,
            "features": ["formatting", "validation", "minification"],
            "active": true
        }
        setInput(JSON.stringify(sample, null, 2))
        setError(null)
    }

    return (
        <ToolWrapper
            title="JSON Formatter & Validator"
            description="Format, prettify, and validate your JSON data. Secure, client-side processing."
            toolSlug="json-formatter"
            adSlot="json-tool-slot"
            className="max-w-7xl"
        >
            <div className="grid gap-6 md:grid-cols-2 h-[500px] lg:h-[calc(100vh-350px)] min-h-[400px]">
                <div className="space-y-2 flex flex-col h-full">
                    <div className="flex items-center justify-between shrink-0">
                        <h3 className="text-lg font-medium">Input JSON</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleLoadSample} className="h-8 px-2">
                                Load Sample
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-2 text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Clear
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 border rounded-md overflow-hidden shadow-sm">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={input}
                            onChange={(value) => setInput(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                wordWrap: "on",
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-2 flex flex-col h-full">
                    <div className="flex items-center justify-between shrink-0">
                        <h3 className="text-lg font-medium">Output</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleDownload} disabled={!output} className="h-8 px-2">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output} className="h-8 px-2">
                                <Copy className="mr-2 h-4 w-4" /> Copy
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 border rounded-md overflow-hidden shadow-sm">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={output}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 13,
                                wordWrap: "on",
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 py-4 justify-center">
                <Button onClick={handleFormat} size="lg">
                    <Maximize className="mr-2 h-4 w-4" /> Format / Prettify
                </Button>
                <Button onClick={handleMinify} variant="secondary" size="lg">
                    <Minimize className="mr-2 h-4 w-4" /> Minify
                </Button>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <ContentSection
                title="The Ultimate JSON Formatter & Validator"
                description={`Stop struggling with messy, unreadable JSON data. Our **Free JSON Formatter** is the perfect tool for developers, data analysts, and students who need to debug, validate, and prettify JSON code instantly.\n\nUnlike other tools that send your possibly sensitive data to a remote server for processing, OpenToolbox performs **100% of the logic right here in your browser**. This means your API keys, user data, and configuration files never leave your device. \n\nWhether you are debugging an API response, minifying a payload for production, or just trying to read a massive configuration file, we've exactly what you need.`}
                features={[
                    "🔒 **100% Client-Side Privacy**: Your data never leaves your browser.",
                    "⚡ **Instant Validation**: Detects syntax errors, missing quotes, and trailing commas immediately.",
                    "🎨 **Syntax Highlighting**: Beautiful, easy-to-read color coding for keys, strings, and booleans.",
                    "📦 **Minification**: Compress functionality to remove whitespace and reduce payload size.",
                    "📂 **File Support**: Copy/Paste or Load huge JSON strings without crashing.",
                    "🌙 **Dark Mode**: Easy on the eyes for late-night debugging sessions."
                ]}
                howToUse={[
                    "Paste your raw / minified JSON code into the left 'Input' editor panels.",
                    "Click the **Format / Prettify** button to organize messy code into a readable tree.",
                    "Use **Minify** if you need to compress the data for production use.",
                    "If there are errors, check the red alert box for detailed syntax correction hints.",
                    "Once happy, click **Copy** or **Download** to save your clean JSON file."
                ]}
                faq={[
                    {
                        question: "Is it safe to paste API keys or passwords here?",
                        answer: "Yes, it is safer than most other online tools. Because we run entirely in your browser (Client-Side), your text input is never sent over the internet. However, as a best practice, we always recommend redacting sensitive secrets before pasting them into any webpage."
                    },
                    {
                        question: "Why is my JSON showing as 'Invalid'?",
                        answer: "JSON is strict! Common errors include: using single quotes (') instead of double quotes (\"), trailing commas after the last item in an object or array, or unquoted keys. Our tool tries to point out exactly line-by-line where the syntax broke."
                    },
                    {
                        question: "Is there a file size limit?",
                        answer: "Technically, no. Since it runs on your machine, the limit is your own browser's memory (RAM). You can formatting files up to 5MB-10MB easily. For files larger than 50MB, the browser might stutter."
                    },
                    {
                        question: "Can I use this offline?",
                        answer: "Yes! Once this page is loaded, you can disconnect your internet and continue using the tool indefinitely. It does not require an active connection to format code."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
