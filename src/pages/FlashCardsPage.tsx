import React, { useEffect, useState } from "react";
import { FlashCardDeck } from "../interface/data_interface";
import { PointsManager } from "../manager/PointsManager";

interface FlashCardsPageProps {
  updateData: (updateDeck: FlashCardDeck) => void;
  deck: FlashCardDeck;
  POINTLIMIT: number;
  BLOCKTIME: number;
  RETENTIONRATE: number;
  getDifference: (
    oldDate: number,
    newDate: number,
    format?: "weeks" | "days" | "hours" | "minutes" | "seconds"
  ) => number;
}

export default function FlashCardsPage(props: FlashCardsPageProps) {
  const [cards, setCards] = useState(
    props.deck.cards.filter((card) => card.points < props.POINTLIMIT)
  );
  const [dataPosition, setDataPosition] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const PM = new PointsManager(
    props.POINTLIMIT,
    props.BLOCKTIME,
    props.RETENTIONRATE
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === " " && !showCard) ||
        (event.code === "Space" && !showCard)
      ) {
        event.preventDefault();
        setShowCard(true);
      } else if (event.key === "x" && showCard) {
        handleNextCard(-2);
      } else if (event.key === "q") {
        handleNextCard(3);
      } else if (event.key === "w") {
        handleNextCard(2);
      } else if (event.key === "e") {
        handleNextCard(1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCard]);

  const handleNextCard = (points: -2 | 1 | 2 | 3) => {
    if (!showCard) return;

    const cardsNewPoints = props.deck.cards.map((card) =>
      card.id === cards[dataPosition].id ? PM.updatePoints(card, points) : card
    );

    // Hide cards than are above point limit and under block time limit
    const cardsLessThanLimit = cardsNewPoints.filter(
      (card) => card.points < props.POINTLIMIT
    );

    // sort cards after round finished based on points
    if (dataPosition >= cardsLessThanLimit.length - 1) {
      cardsNewPoints.sort((a, b) => a.points - b.points);
    }

    setCards(cardsLessThanLimit);
    setShowCard(false);
    setDataPosition(
      dataPosition < cardsLessThanLimit.length - 1 ? dataPosition + 1 : 0
    );
    props.updateData({ ...props.deck, cards: cardsNewPoints });
  };

  return (
    <div className="flash-cards popup-content">
      {cards.length > 0 ? (
        <div className="flashcard-clickable" onClick={() => setShowCard(true)}>
          <p>{cards[dataPosition].front}</p>
          <p style={{ opacity: showCard ? "100%" : "0" }}>
            {cards[dataPosition].back}
          </p>
          <em style={{ opacity: showCard ? "100%" : "0" }}>
            {cards[dataPosition].alternative}
          </em>
        </div>
      ) : props.deck.cards.length > 0 ? (
        <div>
          <p>You have learned all you can for now!</p>
          <p>Return at another time</p>
        </div>
      ) : (
        <div>
          <p>You need to add cards</p>
          <p>Go back and add some!</p>
        </div>
      )}
      {cards.length > 0 && (
        <div className="button-container">
          <button
            onClick={() => handleNextCard(3)}
            style={{ backgroundColor: "#73A580" }}
          >
            Easy
          </button>
          <button
            onClick={() => handleNextCard(2)}
            style={{ backgroundColor: "#F4B860" }}
          >
            Normal
          </button>
          <button
            style={{ backgroundColor: "#C83E4D" }}
            onClick={() => handleNextCard(1)}
          >
            Hard
          </button>
        </div>
      )}
    </div>
  );
}
