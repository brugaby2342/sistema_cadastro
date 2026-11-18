// Regras de negócio das caixas.
// Recebe e devolve dados.

import { BOX_CAPACITY } from "./config.js";
import { registeredParts } from "./parts.js";

export const closedBoxes = [];
export const currentBox = [];

// Adiciona a peça na caixa atual
export function addToBox(part) {
  currentBox.push(part);

  if (currentBox.length === BOX_CAPACITY) {
    closedBoxes.push([...currentBox]); // spread: guarda uma cópia da caixa cheia
    currentBox.length = 0; // esvazia a caixa atual
  }
}

// Esvazia todas as caixas e redistribui as peças aprovada.
export function reorganizeBoxes() {
  closedBoxes.length = 0;
  currentBox.length = 0;

  for (const part of registeredParts) {
    if (part.status === "Aprovada") {
      addToBox(part);
    }
  }
}