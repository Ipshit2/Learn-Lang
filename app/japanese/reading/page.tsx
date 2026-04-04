"use client";
import { useState, useEffect } from "react";
import PracticeArea, { Word } from "@/components/PracticeArea";
import PracticeHistory, { HistoryItem } from "@/components/PracticeHistory";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const language = "japanese"
  const mode = "reading"

  const searchParams = useSearchParams()

  const [words, setWords] = useState<Word[]>([])
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("")
  const [showMeaning, setShowMeaning] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(true);

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            mode,
            filters,
          }),
        })

        const data = await res.json()
        console.log("data is", data)

        setWords(data.words || [])
        setIndex(0)
      } catch (err) {
        console.error("Error fetching words:", err)
        setWords([])
      } finally {
        setLoading(false)
      }
    }
    fetchWords()
  }, [searchParams])

  const current = words[index]

  const handleCheck = () => {
    if (!current) return;

    const isCorrect =
      input.trim().toLowerCase() ===
      current.pronunciation?.toLowerCase();

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
      setIndex((prev) => (prev + 1) % words.length)
      setInput("");
      setShowMeaning(false)
      setChecked(false)
    }, 500)
  };

  if (loading) return <LoadingScreen />
  if (!current) return null

  return (
    <div className="grid grid-cols-2 max-h-screen gap-10 p-10">
      <PracticeArea
        current={current}
        input={input}
        setInput={setInput}
        showMeaning={showMeaning}
        setShowMeaning={setShowMeaning}
        handleCheck={handleCheck}
        checked={checked}
      />

      <PracticeHistory history={history} />
    </div>
  );
}