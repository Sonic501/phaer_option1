import React, { useEffect } from "react";
import { destroyGame, initializeGame } from "..";

export default function GameCanvas() {
  useEffect(() => {
    initializeGame();
    return () => destroyGame();
  }, []);
  return <div id="phaser-container" />;
}
