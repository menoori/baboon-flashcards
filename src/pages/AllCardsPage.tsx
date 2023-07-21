import React, { useEffect, useState } from "react";
import { FlashCardDeck } from "../interface/data_interface";

interface AllCardsPageProps {
  data: FlashCardDeck[];
}
export default function AllCardsPage(props: AllCardsPageProps) {
  return (
    <div className="popup-content">
      <div className="grid  popup-container">
        {props.data.map((deck) => {
          return deck.cards.map((card) => {
            return (
              <div className="grid-card">
                <div>{card.front}</div>
                <div>{card.back}</div>
              </div>
            );
          });
        })}
      </div>

      <div className="button-container">
        <button>Button</button>
      </div>
    </div>
  );
}
