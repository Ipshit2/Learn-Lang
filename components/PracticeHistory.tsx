"use client";
import { Word } from "./PracticeArea";

export type HistoryItem = Word & {
  userInput: string
  correct: boolean
}

type PracticeHistoryProps = {
  history: HistoryItem[]
}

export default function PracticeHistory({ history }: PracticeHistoryProps) {
  return (
    <div className="w-full max-h-[48vh] bg-[#191c20] border border-[#2a2f36] rounded-xl p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Practice History</h2>

      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        {history.length === 0 && (
          <p className="text-md text-[#9FB0C3]">No attempts yet</p>
        )}

        {history.map((item, i) => (
          <div
            key={i}
            className={`py-2 px-4 rounded-lg border transition-all ${
              item.correct
                ? "bg-green-900/10 border-green-500/30"
                : "bg-red-900/20 border-red-500/30"
            }`}>
            <div className="flex justify-between items-center">
              <div className="flex gap-6 justify-between items-center">
                <p
                  className={`text-xl font-medium ${
                    item.correct ? "text-green-400" : "text-red-400"
                  }`}>
                  {item.correct ? "✔" : "✖"}
                </p>
                <div>
                  <h1 className="text-lg font-semibold text-white">{item.word}</h1>
                  <p className="text-md text-gray-400">{item.meaning}</p>
                </div>
              </div>

              <p>
                You: {item.userInput} {"->"} Correct: {item.pronunciation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}