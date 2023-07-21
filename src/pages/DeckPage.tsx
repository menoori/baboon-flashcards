import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FlashCardDeck } from "../interface/data_interface";
import { CONSTANTS } from "../enums";

interface DeckPageProps {
  deck: FlashCardDeck;
  hide_edit_cards: boolean;
}
export default function DeckPage(props: DeckPageProps) {
  return (
    <div className="deck-page popup-content">
      <h1>{props.deck.name}</h1>
      <div className="popup-container grid">
        <div className="grid-card inverse-color">
          <div>No. Cards</div>
          <div>{props.deck.cards.length}</div>
        </div>
        <div className="grid-card inverse-color">
          <div>Another Stat</div>
          <div>543</div>
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
