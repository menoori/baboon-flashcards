import React, { useEffect, useState } from "react";
import { FlashCardDeck } from "../interface/data_interface";
import { PointsManager } from "../manager/PointsManager";
import { LocalStorageManager } from "../manager/LocalStorageManager";
import { CONSTANTS } from "../enums";

interface FlashCardsPageProps {
  updateData: (updateDeck: FlashCardDeck) => void;
  deck: FlashCardDeck;
}

const LSM = new LocalStorageManager(CONSTANTS.KEYID, CONSTANTS.SETTINGID);
const settings = LSM.getAllSettings;
const POINTLIMIT = settings.point_limit;
const RETENTIONRATE = settings.retentionRate;

export default function FlashCardsPage(props: FlashCardsPageProps) {
  const [cards, setCards] = useState(
    props.deck.cards.filter((card) => card.points < POINTLIMIT)
  );
  const [dataPosition, setDataPosition] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const PM = new PointsManager(POINTLIMIT, RETENTIONRATE);
  // All cards at point limit are hidden
  // useEffect(() => {
  //   setCards(cards.filter((card) => card.points < POINTLIMIT));
  // }, [cards]);

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

    const cardsLessThanLimit = cardsNewPoints.filter(
      (card) => card.points < POINTLIMIT
    );
    console.log(dataPosition);
    console.log(cardsLessThanLimit.length);

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
          <em>{cards[dataPosition].points}</em>
          <p style={{ opacity: showCard ? "100%" : "0" }}>
            {cards[dataPosition].back}
          </p>
          <em style={{ opacity: showCard ? "100%" : "0" }}>
            {cards[dataPosition].alternative}
          </em>
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
