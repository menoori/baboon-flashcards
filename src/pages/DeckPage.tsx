import React from "react";
import { NavLink } from "react-router-dom";
import { FlashCardDeck } from "../interface/data_interface";

interface DeckPageProps {
  deck: FlashCardDeck;
  hide_edit_cards: boolean;
  POINTLIMIT: number;
}

export default function DeckPage(props: DeckPageProps) {
  return (
    <div className="deck-page popup-content">
      <h1>{props.deck.name}</h1>
      <div className="popup-container grid">
        <div className="grid-card inverse-color">
          <h4>No. Cards</h4>
          <div>{props.deck.cards.length}</div>
        </div>
        <div className="grid-card inverse-color">
          <h4>No. Learned Cards</h4>
          <div>
            {props.deck.cards.reduce(
              (acc, nV) => (nV.points >= props.POINTLIMIT ? ++acc : acc),
              0
            )}
          </div>
        </div>
      </div>
      <div className="button-container">
        <NavLink to={`/flashcards/${props.deck.id}`}>
          <button className="green">Start</button>
        </NavLink>
        <NavLink to={`/new-card/${props.deck.id}`}>
          <button>Add Card</button>
        </NavLink>
        {!props.hide_edit_cards && (
          <NavLink to={`/edit-deck/${props.deck.id}`}>
            <button>Edit</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
