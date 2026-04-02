"use client";

import { useState } from "react";
import ModeCard from "@/components/ui/ModeCard";

export default function page() {
    const jlptLevels = ["N5", "N4", "N3", "N2", "N1"]
    const scripts = ["Hiragana", "Katakana", "Kanji"]

    const [jlpt, setJlpt] = useState<string[]>(["N5"])
    const [script, setScript] = useState<string[]>(["Hiragana","Katakana","Kanji",])

    return (
        <div className="h-auto font-Inter">
            <h1 className="text-2xl font-semibold mb-2">Japanese</h1>
            <p className="text-[#9FB0C3] mb-8">
                Choose how you want to practice
            </p>

            <div className="flex gap-25">
                <div className="mb-6">
                    <p className="text-sm text-[#9FB0C3] mb-2">JLPT Level</p>
                    <div className="flex gap-2 flex-wrap">
                        {jlptLevels.map((level) => (
                        <button key={level} onClick={() => setJlpt((prev) => prev.includes(level)
                                ? prev.filter((l) => l !== level)
                                : [...prev, level]
                            )}
                            className={`px-3 py-1 rounded-lg text-sm border transition-all
                            ${jlpt.includes(level)
                                ? "bg-[#1A222D] border-[#4ADE80] text-white"
                                : "border-[#272a2f] text-[#9FB0C3] hover:bg-[#1A222D]"
                            }`}>
                            {level}
                        </button>
                        ))}
                    </div>
                </div>
                
                <div>
                    <p className="text-sm text-[#9FB0C3] mb-2">Script</p>
                    <div className="flex gap-2 flex-wrap">
                        {scripts.map((s) => (
                        <button key={s} onClick={() => setScript((prev) => prev.includes(s)
                                ? prev.filter((item) => item !== s)
                                : [...prev, s]
                            )}
                            className={`px-3 py-1 rounded-lg text-sm border transition-all
                            ${script.includes(s)
                                ? "bg-[#1A222D] border-[#4ADE80] text-white"
                                : "border-[#272a2f] text-[#9FB0C3] hover:bg-[#1A222D]"
                            }`}>
                            {s}
                        </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-10 max-w-5xl ">
            <ModeCard
            title="Reading"
            example="ねこ → neko"
            description="Convert Japanese to romanji"
            href="/japanese/reading"
            />

            <ModeCard
            title="Recognition"
            example="ねこ → cat"
            description="Understand meanings"
            href="/japanese/recognition"
            />

            <ModeCard
            title="Recall"
            example="cat → ねこ"
            description="Test your memory"
            href="/japanese/recall"
            />

            <ModeCard
            title="Sentence"
            example="わたしは学生です → I am a student"
            description="Understand full sentences"
            href="/japanese/sentence"
            />

            <ModeCard
            title="Speed Run"
            example="60 second challenge"
            description="Answer as many as possible"
            href="/japanese/speed"
            />

            </div>
        </div>
  )
}