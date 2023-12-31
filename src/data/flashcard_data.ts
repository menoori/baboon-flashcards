import { FlashCard, FlashCardDeck } from "../interface/data_interface";
import { v4 as UUID } from "uuid";

export const flashCardDeckData: FlashCardDeck = {
  id: UUID(),
  name: "Spanish Words",
  cards: [
    {
      id: "1",
      front: "apple",
      back: "manzana",
      tags: ["language"],
      points: 0,
    },
    {
      id: "2",
      front: "cat",
      back: "gato",
      tags: ["language"],
      points: 0,
    },
    {
      id: "3",
      front: "book",
      back: "libro",
      tags: ["language"],
      points: 0,
    },
    {
      id: "4",
      front: "dog",
      back: "perro",
      tags: ["language"],
      points: 0,
    },
    {
      id: "5",
      front: "house",
      back: "casa",
      tags: ["language"],
      points: 0,
    },
    {
      id: "6",
      front: "car",
      back: "coche",
      tags: ["language"],
      points: 0,
    },
    {
      id: "7",
      front: "tree",
      back: "árbol",
      tags: ["language"],
      points: 0,
    },
    {
      id: "8",
      front: "bird",
      back: "pájaro",
      tags: ["language"],
      points: 0,
    },
    {
      id: "9",
      front: "sun",
      back: "sol",
      tags: ["language"],
      points: 0,
    },
    {
      id: "10",
      front: "flower",
      back: "flor",
      tags: ["language"],
      points: 0,
    },
    {
      id: "11",
      front: "table",
      back: "mesa",
      tags: ["language"],
      points: 0,
    },
    {
      id: "12",
      front: "friend",
      back: "amigo",
      tags: ["language"],
      points: 0,
    },
    {
      id: "13",
      front: "school",
      back: "escuela",
      tags: ["language"],
      points: 0,
    },
    {
      id: "14",
      front: "computer",
      back: "computadora",
      tags: ["language"],
      points: 0,
    },
    {
      id: "15",
      front: "water",
      back: "agua",
      tags: ["language"],
      points: 0,
    },
    {
      id: "16",
      front: "music",
      back: "música",
      tags: ["language"],
      points: 0,
    },
    {
      id: "17",
      front: "city",
      back: "ciudad",
      tags: ["language"],
      points: 0,
    },
    {
      id: "18",
      front: "moon",
      back: "luna",
      tags: ["language"],
      points: 0,
    },
    {
      id: "19",
      front: "time",
      back: "tiempo",
      tags: ["language"],
      points: 0,
    },
    {
      id: "20",
      front: "food",
      back: "comida",
      tags: ["language"],
      points: 0,
    },
  ],
};
