import React from "react";
import { FlashCardDeck } from "../interface/data_interface";
import { NavLink } from "react-router-dom";

interface OverViewPageProps {
  data: FlashCardDeck[];
  hide_edit_deck: boolean;
}
export default function OverViewPage(props: OverViewPageProps) {
  return (
    <div className="overview-page popup-content">
      <h1>Card Decks</h1>
      <div className="popup-container">
        <div className="grid">
          {props.data.map((deck) => {
            return (
              <NavLink to={`/deck/${deck.id}`} key={deck.id}>
                <button className="grid-card inverse-color">
                  <h4>{deck.name}</h4>
                  <p>No cards: {deck.cards.length}</p>
                </button>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="button-container">
        <NavLink to={`new-deck`}>
          <button>New Deck</button>
        </NavLink>
        {!props.hide_edit_deck && (
          <NavLink to={`edit`}>
            <button>Edit</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
