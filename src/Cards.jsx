import { useState } from "react";
import styles from "./styles/cards.module.css";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
export function Cards({ data, setData, setScore, setBestScore, bestScore, score }) {
  const [pickedCardsName, setPickedCardsName] = useState([]);

  const handleCardClick = (cardName) => {
    if (pickedCardsName.includes(cardName)) {
        if (score >= bestScore)
            setBestScore(score);
      setScore(0);
      setPickedCardsName([]);
    } else {
      setPickedCardsName((prev) => [...prev, cardName]);
      setScore((score) => score + 1);
      continueGame();
    }
  };

  const continueGame = () => {
    setData(shuffleArray(data));
  };
  return (
    <div className={styles.cards}>
      {data.map((card) => (
        <div
          className={styles.card}
          key={card.name}
          onClick={() => handleCardClick(card.name)}
        >
          <img src={card.imgUrl} alt="pokemon_img" />
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
}
