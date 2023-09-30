import { FieldValues, UseFormGetValues } from "react-hook-form";
import { Player } from "../types/types";

export const shuffleArray = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const mapPlayers = (newPlayerOrder: Player[], getValuesFunc: UseFormGetValues<FieldValues>) => {
  const formValues = getValuesFunc();
  return newPlayerOrder.map((player: Player, i: number) => {
    return {
      'name': formValues[player.id],
      'id': player.id,
      'order': i + 1,
      'score': player.score,
      'stars': player.stars
    }
  })
} 

export const generateEmojis = (count: number, emoji: string) => {
  return emoji.repeat(count);
};