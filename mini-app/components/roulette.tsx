"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Roulette() {
  const [number, setNumber] = useState<number | null>(null);
  const [color, setColor] = useState<string>("green");
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const n = Math.floor(Math.random() * 37); // 0-36
      let col = "green";
      if (n !== 0) {
        col = n % 2 === 0 ? "red" : "black";
      }
      setNumber(n);
      setColor(col);
      setSpinning(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Roulette</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-4xl font-bold">{number !== null ? number : "—"}</div>
        <div className="text-xl">{color}</div>
        <Button onClick={spin} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin"}
        </Button>
      </CardContent>
    </Card>
  );
}
