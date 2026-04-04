"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";

export type Word = {
  word: string
  pronunciation: string
  meaning: string
}

type PracticeAreaProps = {
  current: Word
  input: string
  setInput: (value: string) => void
  showMeaning: boolean
  setShowMeaning: (value: boolean | ((prev: boolean) => boolean)) => void
  handleCheck: () => void
  checked: boolean
};

export default function PracticeArea({
  current,
  input,
  setInput,
  showMeaning,
  setShowMeaning,
  handleCheck,
  checked,
}: PracticeAreaProps) {
  return (
    <div className="flex-1 w-full bg-[#191c20] border border-[#2a2f36] rounded-xl p-8 flex flex-col gap-6 text-center">
      <h1 className="text-6xl font-bold tracking-wider">{current.word}</h1>
      <p className="text-[#9FB0C3]">Type the romaji for this word</p>

      <button
        onClick={() => setShowMeaning((prev) => !prev)}
        className="text-sm text-[#9FB0C3] font-semibold hover:bg-[#1d2025] transition-all duration-200 py-4 rounded-md hover:text-white flex items-center justify-center gap-2">
        {showMeaning ? <FiEyeOff /> : <FiEye />}
        {showMeaning ? "Hide" : "Show English"}
      </button>

      {showMeaning && (
        <p className="text-lg font-semibold bg-[#1d2025] p-2 border border-[#2a2f36] rounded-md text-white">
          {current.meaning}
        </p>
      )}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={checked}
        className="text-lg rounded-md border border-[#2a2f36] text-white p-4"/>

      <button
        onClick={handleCheck}
        className="bg-[#2ccd67] text-black py-2 rounded-md text-md cursor-pointer">
        Check Answer
      </button>
    </div>
  );
}