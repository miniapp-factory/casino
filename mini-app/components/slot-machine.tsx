"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share } from "./share";

const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "🍀"];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export function SlotMachine() {
  const [reels, setReels] = useState<string[]>(["", "", ""]);
  const [winnings, setWinnings] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);

  const spin = () => {
    setSpinning(true);
    const newReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setReels(newReels);

    // Simple win logic: 3 of a kind = 10, 2 of a kind = 2, else 0
    const counts = new Map<string, number>();
    newReels.forEach((s) => {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    });

    let win = 0;
    if ([...counts.values()].includes(3)) {
      win = 10;
    } else if ([...counts.values()].includes(2)) {
      win = 2;
    }
    setWinnings(win);
    setSpinning(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 text-6xl">
        {reels.map((s, i) => (
          <span key={i}>{s || "—"}</span>
        ))}
      </div>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning…" : "Spin"}
      </Button>
      {winnings > 0 && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-semibold">
            You won {winnings} points!
          </span>
          <Share
            text={`I just won ${winnings} points on the Slot Machine Mini App!`}
          />
        </div>
      )}
    </div>
  );
}
