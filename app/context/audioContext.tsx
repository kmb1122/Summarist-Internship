"use client";

import { createContext, useContext, useState } from "react";

interface AudioContextType {
  book: any | null;
  summaryFontSize: number;
  setSummaryFontSize: (size: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  book: null,
  summaryFontSize: 16,
  setSummaryFontSize: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [book, setBook] = useState<any | null>(null);
  const [summaryFontSize, setSummaryFontSize] = useState(16);

  return (
    <AudioContext.Provider value={{ book, summaryFontSize, setSummaryFontSize }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}