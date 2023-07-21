import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LocalStorageManager } from "../manager/LocalStorageManager";
import { FlashCard, FlashCardDeck } from "../interface/data_interface";
import { CONSTANTS } from "../enums";

interface EditDeckPageProps {
  updateData: (updatedDeck: FlashCardDeck) => void;
  deck: FlashCardDeck;
  selectCardToEdit: (cardToEdit: FlashCard) => void;
}
export default function EditDeckPage(props: EditDeckPageProps) {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState(
    props.deck.cards.map((card) => {
      return { cardId: card.id, isSelected: false };
    })
  );

  const handleSelectedCard = (cardId: string) => {
    const element = document.getElementById(cardId);
    element?.classList.toggle("selected");
    setSelectedCards(
      selectedCards.map((selectedCard) =>
        selectedCard.cardId === cardId
          ? { ...selectedCard, isSelected: !selectedCard.isSelected }
          : selectedCard
      )
    );
  };
  const handleEditCard = () => {
    const cardToEdit = props.deck.cards.filter(
      (card) =>
        card.id ===
        selectedCards.filter((selCard) => selCard.isSelected)[0].cardId
    )[0];

    props.selectCardToEdit(cardToEdit);
    navigate({
      pathname: `/edit-card/${selectedCards[0].cardId}/${props.deck.id}`,
    });
  };
  const handleDelete = () => {
    const filteredCards: FlashCardDeck = {
      ...props.deck,
      cards: props.deck.cards.filter(
        (card) =>
          !selectedCards.some(
            (selectedCard) =>
              selectedCard.cardId === card.id && selectedCard.isSelected
          )
      ),
    };
    setSelectedCards(
      filteredCards.cards.map((card) => {
        return { cardId: card.id, isSelected: false };
      })
    );
    props.updateData(filteredCards);
  };

  return (
    <div className="edit-page popup-content">
      <h1>Edit {props.deck.name}</h1>
      <div className="popup-container grid">
        {props.deck.cards.map((card) => {
          return (
            <button
              key={card.id}
              className="grid-card"
              onClick={() => handleSelectedCard(card.id)}
              id={card.id}
            >
              <p>{card.front}</p>
              <p>{card.back}</p>
              <p>{card.points}</p>
            </button>
          );
        })}
      </div>
      <div className="button-container">
        <button
          onClick={handleEditCard}
          disabled={
            selectedCards.reduce(
              (acc, nV) => (nV.isSelected ? ++acc : acc),
              0
            ) !== 1
          }
        >
          Edit
        </button>

        <button
          className="red"
          disabled={
            selectedCards.every((card) => !card.isSelected) ? true : false
          }
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
