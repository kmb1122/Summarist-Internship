"use client";

import { createContext, useContext, useState } from "react";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [book, setBook] = useState(null);
  const [summaryFontSize, setSummaryFontSize] = useState("16px");

  return (
    <AudioContext.Provider value={{
      book,
      setBook,
      summaryFontSize,
      setSummaryFontSize
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}