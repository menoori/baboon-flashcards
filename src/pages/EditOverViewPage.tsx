import React, { useState } from "react";
import { FlashCardDeck } from "../interface/data_interface";
import { NavLink } from "react-router-dom";

interface EditOverViewPageProps {
  data: FlashCardDeck[];
  updateData: (filteredDecks: FlashCardDeck[]) => void;
}
export default function EditOverViewPage(props: EditOverViewPageProps) {
  const [selectedDecks, setSelectedDecks] = useState(
    props.data.map((deck) => {
      return { deckId: deck.id, isSelected: false };
    })
  );

  const handleSelectedDeck = (deckId: string) => {
    const element = document.getElementById(deckId);
    element?.classList.toggle("selected");
    setSelectedDecks(
      selectedDecks.map((selectedDeck) =>
        selectedDeck.deckId === deckId
          ? { ...selectedDeck, isSelected: !selectedDeck.isSelected }
          : selectedDeck
      )
    );
  };

  const handleDelete = () => {
    const filteredDecks: FlashCardDeck[] = props.data.filter(
      (deck) =>
        !selectedDecks.some(
          (selectedDeck) =>
            selectedDeck.deckId === deck.id && selectedDeck.isSelected
        )
    );
    setSelectedDecks(
      filteredDecks.map((deck) => {
        return { deckId: deck.id, isSelected: false };
      })
    );
    props.updateData(filteredDecks);
  };

  const handleExport = () => {
    const deckToExport = props.data.filter(
      (deck) =>
        deck.id ===
        selectedDecks.filter((selDeck) => selDeck.isSelected)[0].deckId
    )[0];

    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(deckToExport, null, 2)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${deckToExport.name}/baboon-flashcard.json`;
    element.click();
  };

  return (
    <div className="edit-page popup-content">
      <h1>Edit Card Decks</h1>
      <div className="popup-container grid">
        {props.data.map((deck) => {
          return (
            <button
              key={deck.id}
              className="grid-card"
              onClick={() => handleSelectedDeck(deck.id)}
              id={deck.id}
            >
              <div>{deck.name}</div>
            </button>
          );
        })}
      </div>
      <div className="button-container">
        <button
          onClick={handleExport}
          disabled={
            selectedDecks.reduce(
              (acc, nV) => (nV.isSelected ? ++acc : acc),
              0
            ) !== 1
          }
        >
          Export
        </button>

        <button
          className="red"
          disabled={
            selectedDecks.every((deck) => !deck.isSelected) ? true : false
          }
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
