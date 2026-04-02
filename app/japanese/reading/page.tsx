"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

type Word = {
  jp: string;
  romaji: string;
  meaning: string;
};

const words: Word[] = [
  { jp: "ねこ", romaji: "neko", meaning: "cat" },
  { jp: "いぬ", romaji: "inu", meaning: "dog" },
  { jp: "みず", romaji: "mizu", meaning: "water" },
];

type HistoryItem = {
  word: string;
  romaji: string;
  meaning: string;
  userInput: string;
  correct: boolean;
};

export default function Page() {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [showMeaning, setShowMeaning] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [checked, setChecked] = useState(false)

  const current = words[index];

  const handleCheck = () => {
  const isCorrect = input.trim().toLowerCase() === current.romaji;

  setHistory((prev) => [
    {
      word: current.jp,
      romaji: current.romaji,
      meaning: current.meaning,
      userInput: input,
      correct: isCorrect,
    },
    ...prev,
  ]);

  setChecked(true);

  setTimeout(() => {
    setIndex((prev) => (prev + 1) % words.length);
    setInput("")
    setShowMeaning(false)
    setChecked(false)
  }, 500)
};

  return (
    <div className="grid grid-cols-2 max-h-screen gap-10 p-10">
      
        <div className="flex-1 w-full bg-[#191c20] border border-[#2a2f36] rounded-xl p-8 flex flex-col gap-6 text-center ">
          
          <h1 className="text-6xl font-bold  tracking-wider">
            {current.jp}
          </h1>

          <p className=" text-[#9FB0C3]">
            Type the romaji for this word
          </p>

          <button
            onClick={() => setShowMeaning((prev) => !prev)}
            className="text-sm text-[#9FB0C3] font-semibold hover:bg-[#1d2025] transition-all duration-200 py-4 rounded-md hover:text-white flex items-center justify-center gap-2">     
                {showMeaning ? <FiEyeOff /> : <FiEye />}
                {showMeaning ? "Hide" : "Show English"}
          </button>

          {showMeaning && (
            <p className=" text-lg font-semibold bg-[#1d2025]  p-2 border border-[#2a2f36]  rounded-md text-white">
              {current.meaning}
            </p>
          )}

          <input value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={checked}
            className=" text-lg rounded-md border border-[#2a2f36] text-white p-4"/>

          <button
            onClick={handleCheck}
            className="bg-[#2ccd67] text-black py-2 rounded-md text-md">
            Check Answer
          </button>

        </div>

        <div className="w-full max-h-[48vh] bg-[#191c20] border border-[#2a2f36] rounded-xl p-6 h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Practice History</h2>

            <div className="flex flex-col gap-3 overflow-y-auto flex-1">
                {history.length === 0 && (
                <p className="text-md text-[#9FB0C3]">
                    No attempts yet
                </p>
                )}

                {history.map((item, i) => (
                <div
                    key={i}
                    className={`py-2  px-4 rounded-lg border transition-all ${
                    item.correct
                        ? "bg-green-900/10 border-green-500/30"
                        : "bg-red-900/20 border-red-500/30"
                    }`}>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-6 justify-between items-center">
                            <p className={`text-xl font-medium ${
                                item.correct ? "text-green-400" : "text-red-400"}`}>
                                {item.correct ? "✔" : "✖"}
                            </p>
                            <div>
                                <h1 className="text-lg font-semibold text-white">
                                {item.word}
                                </h1>
                                <p className="text-md text-gray-400">
                                {item.meaning}
                                </p>
                            </div>
                        </div>

                        <p>You: {item.userInput} {"->"} Correct: {item.meaning}</p>        
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>
  )
}