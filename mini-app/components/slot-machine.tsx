"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share } from "./share";
import "../styles/slot-machine.css";

const reels = ["🍒", "🍋", "🍊", "🍇", "🍉", "⭐", "🍀"];

export function SlotMachine() {
  const [values, setValues] = useState<string[]>(["🍒", "🍋", "🍊"]);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(false);

  const spin = () => {
    setSpinning(true);
    setWin(false);
    const newValues = Array.from(
      { length: 3 },
      () => reels[Math.floor(Math.random() * reels.length)]
    );
    setTimeout(() => {
      setValues(newValues);
      setSpinning(false);
      const allSame = newValues.every((v) => v === newValues[0]);
      setWin(allSame);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex space-x-2 text-4xl">
        {values.map((v, i) => (
          <span
            key={i}
            className={`transition-transform duration-500 ${
              spinning ? "animate-spin-slow" : ""
            }`}
          >
            {v}
          </span>
        ))}
      </div>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </Button>
      {win && (
        <Share text={`I just won the slot machine! ${process.env.NEXT_PUBLIC_URL}`} />
      )}
    </div>
  );
}
