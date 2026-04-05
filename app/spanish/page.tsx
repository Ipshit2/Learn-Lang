"use client";

import { useState } from "react";
import ModeCard from "@/components/ui/ModeCard";

export default function Page() {
  const levels = ["A1", "A2", "B1", "B2","C1","C2"];
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["A1"]);

  return (
    <div className="h-auto font-Inter ">
      
      <h1 className="text-2xl font-semibold mb-2">Spanish</h1>
      <p className="text-[#9FB0C3] mb-8">
        Choose how you want to practice
      </p>

      <div>
        
        <div className="mb-6">
          <p className="text-sm text-[#9FB0C3] mb-2">Level</p>
          <div className="flex gap-2 flex-wrap">
            {levels.map((level) => (
              <button key={level} onClick={() => setSelectedLevels((prev) => prev.includes(level)
                    ? prev.filter((l) => l !== level)
                    : [...prev, level]
                )}
                className={`px-3 py-1 rounded-lg text-sm border transition-all
                  ${
                    selectedLevels.includes(level)
                      ? "bg-[#1A222D] border-[#4ADE80] text-white"
                      : "border-[#272a2f] text-[#9FB0C3] hover:bg-[#1A222D]"
                  }`}>
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 max-w-6xl">
        
        <ModeCard
          title="Recall"
          example="cat → gato"
          description="Write Spanish from English"
          href="/spanish/recall"
          active={true}
        />

        <ModeCard
          title="Recognition"
          example="gato → cat"
          description="Understand meanings"
          href="/spanish/recognition"
          active={false}
        />

        <ModeCard
          title="Sentence"
          example="Yo soy estudiante → I am a student"
          description="Understand full sentences"
          href="/spanish/sentence"
          active={false}
        />

        <ModeCard
          title="Speed Run"
          example="60 second challenge"
          description="Answer as many as possible"
          href="/spanish/speed"
          active={false}
        />

      </div>
    </div>
  );
}