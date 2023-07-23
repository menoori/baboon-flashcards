import React, { FormEvent, useState } from "react";
import { FlashCard, FlashCardDeck } from "../interface/data_interface";
import { v4 as UUID } from "uuid";
import { NavigateFunction } from "react-router-dom";

interface FormData {
  deck_name: string;
  data_string_set: string;
}
interface NewDeckPageProps {
  updateData: (deckdata: FlashCardDeck) => void;
  navigate: NavigateFunction;
}

export default function NewDeckPage(props: NewDeckPageProps) {
  const [formData, setFormData] = useState<FormData>({
    deck_name: "",
    data_string_set: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { deck_name, data_string_set } = formData;
    let data: FlashCard[] = [];

    if (data_string_set.trim() !== "") {
      try {
        const deck = JSON.parse(data_string_set) as FlashCardDeck;
        data = deck.cards;
      } catch (error) {
        return window.alert("Wrong Data Structure");
      }
    }
    const deckdata = {
      id: UUID(),
      name: deck_name,
      cards: data,
    } as FlashCardDeck;
    props.updateData(deckdata);
    props.navigate({ pathname: "/" });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="newdeck-page popup-content"
    >
      <div className="popup-container">
        <h1>New Deck</h1>
        <fieldset>
          <label htmlFor="deck-name">Deck Name</label>
          <input
            type="text"
            id="deck_name"
            name="deck_name"
            onChange={handleChange}
            value={formData.deck_name}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="data-string-set">Data String Set</label>
          <textarea
            value={formData.data_string_set}
            onChange={handleChange}
            id="data_string_set"
            name="data_string_set"
          />
        </fieldset>
      </div>
      <div className="button-container">
        <button type="submit">Create New Deck</button>
      </div>
    </form>
  );
}
