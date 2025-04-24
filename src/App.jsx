import { useState } from "react";
import styles from "./styles/app.module.css";
import Game from "./Game.jsx";
export default function App() {
  const [showGame, setShowGame] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  function startGameHandler() {
    setShowGame(true);
    setShowMenu(false);
  }
  function showHowToPlayHandler() {
    setShowHowToPlay(true);
  }
  return (
    <div className={styles.app}>
      {showHowToPlay && (
        <div className={styles.dialogBackdrop}>
          <div className={styles.dialogBox}>
            <h2>How to Play</h2>
            <p>
              1.You can click on cards that you didn`t click before to get
              points.
            </p>
            <p>
              2.Best score is the highest score you got in the previous rounds.
            </p>
            <p>3.You win if you find all unique cards.</p>
            <button onClick={() => setShowHowToPlay(false)}>OK</button>
          </div>
        </div>
      )}
      {showMenu && (
        <div className={styles.gameStart}>
          <header className={styles.header}>Memory Card Game</header>
          <button onClick={startGameHandler}>Start Game</button>
          <button onClick={showHowToPlayHandler}>How to Play</button>
        </div>
      )}
      {showGame && <Game setShowMenu={setShowMenu} setShowGame={setShowGame} />}
    </div>
  );
}
