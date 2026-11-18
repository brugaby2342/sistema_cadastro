
// Sistema de Controle de Produção e Qualidade de Peças

import readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

import { BOX_CAPACITY } from "./src/config.js";
import {
  registeredParts,
  partExists,
  createPart,
  removePart,
} from "./src/parts.js";
import {
  closedBoxes,
  currentBox,
  addToBox,
  reorganizeBoxes,
} from "./src/boxes.js";
import { generateReport } from "./src/report.js";

// ---------- Entrada do menu ----------

const rl = readline.createInterface({ input, output });

// Pergunta até o usuário digitar um número válido para o menu; await espera pela execução da promise da função assíncrona para retornar o valor
async function askNumber(question) {
  while (true) {
    const answer = (await rl.question(question)).trim().replace(",", ".");
    const number = Number(answer);

    if (answer !== "" && !Number.isNaN(number)) {
      return number;
    }
    console.log("Valor inválido. Digite um número.");
  }
}

// ---------- Opções do menu ----------

function showMenu() {
  console.log("\n===== CONTROLE DE PRODUÇÃO E QUALIDADE =====");
  console.log("1 - Cadastrar peça");
  console.log("2 - Listar peças");
  console.log("3 - Remover peça");
  console.log("4 - Listar caixas");
  console.log("5 - Gerar relatório final");
  console.log("0 - Sair");
}

async function registerPart() {
  console.log("Iniciando cadastro de nova peça...");

  const id = (await rl.question("Digite o ID da peça: ")).trim();
  if (id === "") {
    console.log("O ID não pode ficar vazio. Cadastro cancelado.");
    return;
  }
  if (partExists(id)) {
    console.log(`Já existe uma peça com o ID ${id}. Cadastro cancelado.`);
    return;
  }

  const weight = await askNumber("Digite o peso da peça (g): ");
  const color = (await rl.question("Digite a cor da peça: ")).trim().toLowerCase();
  const length = await askNumber("Digite o comprimento da peça (cm): ");

  const part = createPart(id, weight, color, length);

if (part.status === "Aprovada") {
    addToBox(part);
    console.log(`✔ Peça ${id} aprovada e adicionada.`);
  } else {
    console.log(`✘ ATENÇÃO! Peça ${id} não passou no teste de qualidade.`);
    console.log("Nem todos os requisitos de qualidade foram alcançados:");
    for (const reason of part.reasons) {
      console.log(`- ${reason}`);
    }
  }
}

function listParts() {
  if (registeredParts.length === 0) {
    console.log("Nenhuma peça cadastrada.");
    return;
  }

  for (const part of registeredParts) {
    // Primeira letra da cor em maiúscula, só para exibição
    const color = part.color.charAt(0).toUpperCase() + part.color.slice(1);

    console.log(`ID: ${part.id} | Status: ${part.status}`);
    console.log(`Características: ${part.weight.toFixed(1)}g, ${part.length.toFixed(1)}cm na cor ${color}, `);
    if (part.reasons.length > 0) {
      console.log(`  Falhas encontradas: ${part.reasons.join(", ")}`);
    }
  }
}

async function askRemovePart() {
  const id = (await rl.question("Digite o ID da peça que você deseja remover: ")).trim();

  if (!removePart(id)) {
    console.log(`Peça ID ${id} não encontrada.`);
    return;
  }

  reorganizeBoxes();
  console.log(`Peça ID ${id} removida com sucesso!`);
  console.log(`Caixas reorganizadas após a remoção da peça ${id}.`);
}

function listBoxes() {
  if (closedBoxes.length === 0) {
    console.log("Nenhuma caixa fechada até o momento.");
  }

  closedBoxes.forEach((box, index) => {
    // extrai os IDs e junta numa string legível
    const ids = box.map((part) => part.id).join(", ");
    console.log(`📦 Caixa ${index + 1} (fechada) — peças: ${ids}`);
  });

  console.log(`Caixa atual (em aberto): ${currentBox.length}/${BOX_CAPACITY} peças.`);
}

function showReport() {
  const report = generateReport();

  console.log("RELATÓRIO FINAL:");
  console.log(`Total de peças cadastradas: ${report.total}`);
  console.log(`✔ Total de peças aprovadas: ${report.approved}`);
  console.log(`✘ Total de peças reprovadas: ${report.rejected}`);
  console.log(`📦 Total de caixas utilizadas (fechadas e em uso): ${report.usedBoxes}`);

  if (report.rejected > 0) {
    console.log("Os motivos para reprovação registrados são:");
    for (const [reason, count] of Object.entries(report.reasonCounter)) {
      console.log(`${reason}: ${count} vez(es)`);
    }
  }
}

// ---------- Programa principal ----------

// Liga cada opção do menu à sua função
const OPTIONS = {
  "1": registerPart,
  "2": listParts,
  "3": askRemovePart,
  "4": listBoxes,
  "5": showReport,
};

async function main() {
  while (true) {
    showMenu();
    const option = (await rl.question("Selecione uma das seguintes opções: ")).trim();

    if (option === "0") {
      console.log("Encerrando o sistema...");
      break;
    }

    const action = OPTIONS[option];
    if (action) {
      await action(); 
    } else {
      console.log("Opção inválida. Tente novamente.");
    }
  }

  rl.close();
}

main();