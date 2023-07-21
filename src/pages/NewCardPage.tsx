import React, { FormEvent, useState } from "react";
import { v4 as UUID } from "uuid";
import { AnimationManager } from "../manager/AnimationManager";
import { FlashCard } from "../interface/data_interface";

interface NewCardPageProps {
  deckId: string;
  updateData: (flashCard: FlashCard, deckId: string) => void;
}
interface FormData {
  front: string;
  back: string;
  alternative: string;
}
const emptyForm = {
  front: "",
  back: "",
  alternative: "",
};
export default function NewCardPage(props: NewCardPageProps) {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [noNewCards, setNoNewCards] = useState(0);

  const AM = new AnimationManager();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { front, back, alternative } = formData;
    if (front.trim() === "") {
      const element = document.getElementById("front");
      AM.animateElement(element!, "shakeHorError");
      return;
    } else if (back.trim() === "") {
      const element = document.getElementById("back");
      AM.animateElement(element!, "shakeHorError");
      return;
    }
    try {
      const newCard: FlashCard = {
        id: UUID(),
        front: front,
        back: back,
        alternative: alternative,
        points: 0,
        tags: [],
      };
      setFormData(emptyForm);
      setNoNewCards(noNewCards + 1);
      props.updateData(newCard, props.deckId);
      // setNewCards([...newCards, newCard]);
    } catch (error) {
      window.alert("Error in handleSubmit in NewCard Component");
      return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="newcard-page popup-content"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="popup-container">
        <h1>
          New Card
          <i className="new-card-amount">{noNewCards}</i>
        </h1>

        <fieldset>
          <label htmlFor="front">Front</label>
          <input
            type="text"
            id="front"
            name="front"
            onChange={handleChange}
            value={formData.front}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="back">Back</label>
          <input
            value={formData.back}
            onChange={handleChange}
            id="back"
            name="back"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="alternative">Alternative?</label>
          <input
            value={formData.alternative}
            onChange={handleChange}
            id="alternative"
            name="alternative"
          />
        </fieldset>
      </div>
      <div className="button-container">
        <button type="submit">Create New Card</button>
      </div>
    </form>
  );
}
