export interface FlashCardData {
  id: string;
  decks: FlashCardDeck[];
}

export interface FlashCardDeck {
  id: string;
  name: string;
  cards: FlashCard[];
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  alternative?: string;
  tags: string[]; // METODO: future content
  points: number;
  seenLast?: number;
}
