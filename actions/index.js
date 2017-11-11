export const ADD_DECK = "ADD_DECK";
export const UPDATE_DECK = "UPDATE_DECK";

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function updateDeck(deck) {
  return {
    type: UPDATE_DECK,
    deck
  };
}
