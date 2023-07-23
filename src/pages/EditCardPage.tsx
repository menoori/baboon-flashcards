import React, { FormEvent, useState } from "react";
import { AnimationManager } from "../manager/AnimationManager";
import { FlashCard } from "../interface/data_interface";

interface EditCardPageProps {
  deckId: string;
  card: FlashCard;
  updateCard: (flashCard: FlashCard, deckId: string) => void;
  formatDate: (
    date: Date | number | string,
    format: "YYMMDD" | "YYYY-MM-DD" | "YYMMDD hh:mm:ss" | "hh:mm:ss" | "hh:mm"
  ) => string;
}
interface FormData {
  front: string;
  back: string;
  alternative: string;
  points: number;
  seenLast: string;
}

export default function EditCardPage(props: EditCardPageProps) {
  const [formData, setFormData] = useState<FormData>({
    front: props.card.front,
    back: props.card.back,
    alternative: props.card.alternative!,
    points: props.card.points,
    seenLast: props.card.seenLast
      ? props.formatDate(props.card.seenLast, "YYYY-MM-DD")
      : props.formatDate(Date.now(), "YYYY-MM-DD"),
  });

  const AM = new AnimationManager();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { front, back, alternative, points, seenLast } = formData;
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
      const updatedCard: FlashCard = {
        ...props.card,
        front: front,
        back: back,
        alternative: alternative,
        points: points,
        seenLast: new Date(seenLast).getTime(),
      };
      props.updateCard(updatedCard, props.deckId);
      window.history.back();
    } catch (error) {
      window.alert("Error in handleSubmit in EditCard Page");
      return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="editcard-page popup-content"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="popup-container">
        <h1>Edit Card</h1>

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
        <fieldset>
          <label htmlFor="points">Points</label>
          <input
            value={formData.points}
            onChange={handleChange}
            id="points"
            name="points"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="seenLast">Seen Last</label>
          <input
            value={formData.seenLast}
            onChange={handleChange}
            id="seenLast"
            name="seenLast"
            type="date"
          />
        </fieldset>
      </div>
      <div className="button-container">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}
