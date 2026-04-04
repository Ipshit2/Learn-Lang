"use client";

export default function LoadingScreen() {
  return (
    <div className="flex pt-20 justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-black rounded-full animate-spin"></div>

        <p className="text-lg font-medium text-gray-700">
          Generating practice...
        </p>
      </div>
    </div>
  );
}