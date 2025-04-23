import { useState, useEffect } from "react";
import { Cards } from "./Cards.jsx";

const numOfPokeMons = 12;
export default function Game() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= numOfPokeMons; i++) {
          promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon-form/${i}`).then((res) =>
              res.json()
            )
          );
        }

        const result = await Promise.all(promises);
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
  }, []);
  return (
    <div className="game">
        <div className="score">Score: {score}</div>
        <div className="bestScore">Best Score: {bestScore}</div>
      <Cards data={data} setData={setData} score={score} setScore={setScore} setBestScore = {setBestScore} bestScore= {bestScore}/>
    </div>
  );
}
