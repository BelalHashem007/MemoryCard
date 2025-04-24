import { useState, useEffect } from "react";
import { Cards } from "./Cards.jsx";
import styles from "./styles/game.module.css";

const numOfPokeMons = 16;
export default function Game({ setShowMenu, setShowGame }) {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pickedCardsName, setPickedCardsName] = useState([]);
  const [reload, setReload] = useState(false);

  function showMenuHandler() {
    setShowMenu(true);
    setShowGame(false);
  }
  function resetHandler() {
    setScore(0);
    setBestScore(0);
    setPickedCardsName([]);
    setGameOver(false);
  }
  function reloadHandler() {
    setReload(prev => !prev);
    resetHandler();
  }

  useEffect(() => {
  
    const fetchData = async () => {
      const uniqueIds = [];
      for (let i = 0; uniqueIds.length < numOfPokeMons; i++) {
        const num = Math.ceil(Math.random() * 300);
        if (!uniqueIds.includes(num)) uniqueIds.push(num);
        else continue;
      }
      try {
        const promises = [];
        for (let i = 0; i < numOfPokeMons; i++) {
          promises.push(
            fetch(
              `https://pokeapi.co/api/v2/pokemon-form/${uniqueIds[i]}`
            ).then((res) => res.json())
          );
        }
        const result = await Promise.all(promises);
        console.log(result)
        const cards = result.map((data) => ({
          name: data.name,
          imgUrl: data.sprites.front_default,
        }));
        setData(cards);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [reload]);
  return (
    <div className={styles.game}>
      <div className={styles.subHeaderContainer}>
        <button onClick={showMenuHandler} className={styles.showMenuButton}>
          Menu
        </button>
        <button onClick={reloadHandler} className={styles.changePoke}>
          Change Pokemons
        </button>
        <button onClick={resetHandler} className={styles.reset}>
          Reset
        </button>
      </div>
      <div className={styles.scoresContainer}>
        <div className={styles.score}>Score: {score}</div>
        <div className={styles.bestScore}>Best Score: {bestScore}</div>
      </div>
      {gameOver && (
        <div className={styles.gameOverText}>
          Congratulations! You have found all cards.
        </div>
      )}
      <Cards
        data={data}
        setData={setData}
        score={score}
        setScore={setScore}
        setBestScore={setBestScore}
        bestScore={bestScore}
        setGameOver={setGameOver}
        gameOver={gameOver}
        pickedCardsName={pickedCardsName}
        setPickedCardsName={setPickedCardsName}
      />
    </div>
  );
}
