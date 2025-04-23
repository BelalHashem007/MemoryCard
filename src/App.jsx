import { useState } from "react";
import styles from "./styles/app.module.css";
import Game from "./Game.jsx";
export default function App() {
  const [showGame, setShowGame] = useState(false);

  function startGameHandler() {
    setShowGame(true);
  }
  return (
    <div className="app">
      <div
        className="game-info"
        style={{ display: showGame ? "none" : "block" }}
      >
        <article>
          <h2>Game Rules!</h2>
          <p>
            You can click on cards that you didn`t click before to get points.
          </p>
          <p>When you click on card you clicked before the game ends.</p>
          <p>Best score is the highest score you got in the previous rounds.</p>
        </article>
        <button onClick={startGameHandler}>Start Game</button>
      </div>
      {showGame && <Game/>}
      <footer>Background image from <a href="https://www.wallpaperflare.com/search?wallpaper=Legendary+Pok%C3%A9mon" target="_blank" rel="noopener noreferrer">Wallpaper Flare</a></footer>
    </div>
  );
}
