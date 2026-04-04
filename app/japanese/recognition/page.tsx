"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LoadingScreen from "@/components/ui/LoadingScreen";

type Word = {
  word: string
  pronunciation: string
  meaning: string
}

type HistoryItem = Word & {
  userInput: string
  correct: boolean
}

export default function RecallPage() {
  const language = "japanese"
  const mode = "recognition"

  const searchParams = useSearchParams()

  const [words, setWords] = useState<Word[]>([])
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [showWord, setShowWord] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(true)

  const filters: Record<string, string[]> = {}
  searchParams?.forEach((value, key) => {
    filters[key] = value.split(",").map((v) => v.trim())
  })

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, mode, filters }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("API ERROR:", data);
          setWords([]);
          return;
        }

        setWords(data.words || []);
        setIndex(0);
      } catch (err) {
        console.error("Error fetching words:", err);
        setWords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, [searchParams]);

  const current = words[index];

  const handleCheck = () => {
    if (!current) return;

    const isCorrect =
      input.trim().toLowerCase() === current.meaning?.toLowerCase()

    setHistory((prev) => [
      {
        word: current.word,
        pronunciation: current.pronunciation,
        meaning: current.meaning,
        userInput: input,
        correct: isCorrect,
      },
      ...prev,
    ]);

    setChecked(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setInput("");
      setShowWord(false);
      setChecked(false);
    }, 500);
  };

  if (loading) return <LoadingScreen />
  if (!current) return null

  return (
    <div className="grid grid-cols-2 max-h-screen gap-10 p-10 text-white">
      <div className="flex-1 w-full bg-[#191c20] border border-[#2a2f36] rounded-xl p-8 flex flex-col gap-6 text-center">
        <p className=" text-[#9FB0C3]">What is the meaning of:</p>
        <h1 className="text-6xl font-bold tracking-wider">
          {current.word}
        </h1>
        

         <button
          onClick={() => setShowWord((prev) => !prev)}
          className="text-sm text-[#9FB0C3] font-semibold hover:bg-[#1d2025] transition-all duration-200 py-2 rounded-md hover:text-white flex items-center justify-center gap-2"
        >
          {showWord ? <FiEyeOff /> : <FiEye />}
          {showWord ? "Hide Word" : "Show Word"}
        </button>

        {showWord && (
          <p className="text-lg font-semibold bg-[#1d2025] p-2 border border-[#2a2f36] rounded-md text-white">
            {current.meaning} 
          </p>
        )} 

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={checked}
          className="text-lg rounded-md border border-[#2a2f36] text-white p-4 focus:outline-none focus:ring-2 focus:ring-[#2ccd67] transition-all"
          placeholder="Type the word here..."
        />

        <button
          onClick={handleCheck}
          className="bg-[#2ccd67] text-black py-2 rounded-md text-md cursor-pointer hover:bg-[#24b95b] transition-all"
        >
          Check Answer
        </button>
      </div>

      <div className="w-full max-h-[48vh] bg-[#191c20] border border-[#2a2f36] rounded-xl p-6 flex flex-col overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Practice History</h2>

        {history.length === 0 ? (
          <p className="text-md text-[#9FB0C3]">No attempts yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((item, i) => (
              <div
                key={i}
                className={`py-2 px-4 rounded-lg border transition-all ${
                  item.correct
                    ? "bg-green-900/10 border-green-500/30"
                    : "bg-red-900/20 border-red-500/30"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <p
                      className={`text-xl font-bold ${
                        item.correct ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.correct ? "✔" : "✖"}
                    </p>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.word}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm">
                    You: {item.userInput} → Correct: {item.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}