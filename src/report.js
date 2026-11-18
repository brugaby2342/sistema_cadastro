// Cálculo do relatório.

import { registeredParts } from "./parts.js";
import { closedBoxes, currentBox } from "./boxes.js";

// Gera relatório
export function generateReport() {
  const total = registeredParts.length;
  const approved = registeredParts.filter((part) => part.status === "Aprovada").length;
  const rejected = total - approved;
  const usedBoxes = closedBoxes.length + (currentBox.length > 0 ? 1 : 0);

  // Conta quantas vezes cada motivo de reprovação aparece
  const reasonCounter = {};
  for (const part of registeredParts) {
    for (const reason of part.reasons) {
      const reasonType = reason.split(" (")[0];
      reasonCounter[reasonType] = (reasonCounter[reasonType] || 0) + 1;
    }
  }
  
  return { total, approved, rejected, usedBoxes, reasonCounter };
}