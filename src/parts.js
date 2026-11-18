// Regras de negócio das peças.
// Recebe e devolve dados.

import {
  MIN_WEIGHT,
  MAX_WEIGHT,
  MIN_LENGTH,
  MAX_LENGTH,
  VALID_COLORS,
} from "./config.js";

export const registeredParts = []; // peças aprovadas e reprovadas

export function validatePart(weight, color, length) {
  const reasons = [];

  if (weight < MIN_WEIGHT || weight > MAX_WEIGHT) {
    reasons.push(`Peso fora do padrão (${weight.toFixed(1)}g)`);
  }
  if (!VALID_COLORS.has(color)) {
    reasons.push(`Cor inválida (${color})`);
  }
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    reasons.push(`Comprimento fora do padrão (${length.toFixed(1)}cm)`);
  }

  return reasons;
}

export function partExists(id) {
  return registeredParts.some((part) => part.id === id);
}

export function createPart(id, weight, color, length) {
  const reasons = validatePart(weight, color, length);
  const status = reasons.length === 0 ? "Aprovada" : "Reprovada";

  const part = { id, weight, color, length, reasons, status };
  registeredParts.push(part);

  return part;
}

export function removePart(id) {
  const index = registeredParts.findIndex((part) => part.id === id);

  if (index === -1) {
    return false;
  }

  registeredParts.splice(index, 1);
  return true;
}