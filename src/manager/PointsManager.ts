import { FlashCard } from "../interface/data_interface";
import { DateManager } from "./DateManager";

export class PointsManager {
  private _DM = new DateManager();
  private _retentionConstant: number;
  private _pointsLimit: number;
  private _blockTime: number;
  constructor(
    pointsLimit: number,
    blockTime: number,
    retentionConstant: number
  ) {
    this._retentionConstant = retentionConstant;
    this._pointsLimit = pointsLimit;
    this._blockTime = blockTime;
  }

  updatePoints(card: FlashCard, amount: number): FlashCard {
    let copyCard = { ...card };
    const currentTime = Date.now();

    // if word solved within block time, leave points as is and update seenLast
    console.log(
      this._DM.getDifference(currentTime, copyCard.seenLast!, "hours")
    );

    console.log(this._blockTime);

    if (
      copyCard.seenLast !== undefined &&
      this._DM.getDifference(currentTime, copyCard.seenLast, "hours") <
        this._blockTime
    ) {
      return { ...copyCard, seenLast: Date.now() };
    }

    // If first time seeing this card add a seenLast property
    if (copyCard.seenLast === undefined) {
      copyCard = { ...copyCard, seenLast: Date.now() };
    }

    // some cards might have null points
    else if (copyCard.points === null) {
      copyCard = { ...copyCard, points: 0 };
    }

    // Remove points based on retention rate
    if (copyCard.points > 0 && copyCard.seenLast !== undefined) {
      const timeBetween = this._DM.getDifference(
        currentTime,
        copyCard.seenLast,
        "days"
      );
      // If more than one day, apply penalty
      if (timeBetween > 1) {
        const retentionRate = Math.exp(-timeBetween / this._retentionConstant);
        copyCard = { ...copyCard, points: copyCard.points * retentionRate };
      }
    }

    // Add extra points based on spaced repetition
    if (copyCard.seenLast !== undefined) {
      const timeBetween = this._DM.getDifference(
        currentTime,
        copyCard.seenLast,
        "days"
      );
      if (timeBetween > 1 && timeBetween < 3) {
        copyCard = { ...copyCard, points: copyCard.points + 1 };
      } else if (timeBetween > 3 && timeBetween < 7) {
        copyCard = { ...copyCard, points: copyCard.points + 3 };
      } else if (timeBetween > 7 && timeBetween < 14) {
        copyCard = { ...copyCard, points: copyCard.points + 5 };
      } else if (timeBetween > 14) {
        copyCard = { ...copyCard, points: copyCard.points + 10 };
      }
    }
    // Add the points based on the anser
    copyCard = {
      ...copyCard,
      points: copyCard.points + amount,
      seenLast: currentTime,
    };

    return copyCard;
  }
}
