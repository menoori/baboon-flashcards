import React, { useState } from "react";
import { FlashCardDeck } from "../interface/data_interface";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface OverViewPageProps {
  data: FlashCardDeck[];
  hide_edit_deck: boolean;
}
export default function OverViewPage(props: OverViewPageProps) {
  const [data, setData] = useState(props.data);

  return (
    <div className="overview-page popup-content">
      <h1>Card Decks</h1>
      <div className="popup-container">
        <div className="grid">
          {data.map((deck) => {
            return (
              <NavLink className="grid-card" to={deck.id} key={deck.id}>
                <p>{deck.name}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="button-container">
        <NavLink to={`new-deck`}>
          <button>New Deck</button>
        </NavLink>
        <NavLink to={`all-cards`}>
          <button>All Words</button>
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
