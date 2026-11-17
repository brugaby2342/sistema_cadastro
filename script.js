
// Sistema de Controle de Produção e Qualidade de Peças
// Versão base: todo o código em um único arquivo.

import readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
/*
Se começasse com require, depois teria que trocar tudo para import. 
O import/export é o jeito atual do JavaScript, usado tanto no navegador quanto no Node. 
Quando fizer o index.html, vai usar import lá também.
O package.json é a “certidão” do projeto. 
Ele registra nome, versão, descrição, autora e comandos. Projetos de portfólio sem ele parecem incompletos.
Ganha o comando npm start, que é o jeito padrão de rodar projetos Node.
No package.json: "type": "module" é o que libera o import. Sem essa linha, o Node espera require.
"scripts": { "start": ... } faz o npm start rodar o programa.
*/

// ---------- Constantes (critérios de qualidade) ----------

/*
PESO: 95g a 105g
COR: azul ou verde
TAMANHO: 10cm a 20cm
CAIXA: 10 peças
*/

const minWeight = 95 // gramas
const maxWeight = 105
const minLength = 10 // centímetros
const maxLength = 20
const validColors = new Set(["azul", "verde"])
const boxCapacity = 10

// ---------- Estado do sistema (em memória) ----------

const registeredParts = [] // todas as peças (aprovadas e reprovadas)
const closedBoxes = [] // caixas já fechadas (cada caixa é um array de peças)
let currentBox = [] // caixa em aberto

// ---------- Leitura do teclado ----------

const rl = readline.createInterface({ input, output });

// Pergunta até o usuário digitar um número válido. Aceita vírgula ou ponto.
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

// ---------- Regras de negócio ----------

// Função pura: recebe as medidas e devolve a lista de motivos de reprovação.
// Lista vazia significa peça aprovada.
function validatePart(weight, color, length) {
  const reasons = [];

  if (weight < minWeight || weight > maxWeight) {
    reasons.push(`Peso fora do padrão (${weight.toFixed(1)}g)`);
  }
  if (!validColors.has(color)) {
    reasons.push(`Cor inválida (${color})`);
  }
  if (length < minLength || length > maxLength) {
    reasons.push(`Comprimento fora do padrão (${length.toFixed(1)}cm)`);
  }

  return reasons;
}

// Coloca a peça na caixa atual; se a caixa encher, fecha e abre outra.
function addToBox(part) {
  currentBox.push(part);

  if (currentBox.length === boxCapacity) {
    closedBoxes.push([...currentBox]); // guarda uma cópia da caixa cheia
    currentBox = [];
  }
}

// Esvazia todas as caixas e redistribui as peças aprovadas, na ordem de cadastro.
function reorganizeBoxes() {
  closedBoxes.length = 0; // esvazia o array
  currentBox = [];

  for (const part of registeredParts) {
    if (part.status === "Aprovada") {
      addToBox(part);
    }
  }
}

// ---------- Opções do menu ----------

function showMenu() {
  console.log("\n===== CONTROLE DE PRODUÇÃO E QUALIDADE =====");
  console.log("1 - Cadastrar peça");
  console.log("2 - Listar peças");
  console.log("3 - Remover peça");
  console.log("4 - Listar caixas fechadas");
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
  if (registeredParts.some((part) => part.id === id)) {
    console.log(`Já existe uma peça com o ID ${id}. Cadastro cancelado.`);
    return;
  }

  const weight = await askNumber("Digite o peso da peça (g): ");
  const color = (await rl.question("Digite a cor da peça: ")).trim().toLowerCase();
  const length = await askNumber("Digite o comprimento da peça (cm): ");

  const reasons = validatePart(weight, color, length);
  const status = reasons.length === 0 ? "Aprovada" : "Reprovada";

  const part = { id, weight, color, length, reasons, status };
  registeredParts.push(part);

  if (status === "Aprovada") {
    addToBox(part);
    console.log(`✔ Peça ${id} aprovada e adicionada.`);
  } else {
    console.log(`✘ ATENÇÃO! Peça ${id} não passou no teste de qualidade.`);
    console.log("Nem todos os requisitos de qualidade foram alcançados:");
    for (const reason of reasons) {
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
    console.log(`Medidas: ${part.weight.toFixed(1)}g, ${color}, ${part.length.toFixed(1)}cm`);
    if (part.reasons.length > 0) {
      console.log(`  Falhas encontradas: ${part.reasons.join(", ")}`);
    }
  }
}

async function removePart() {
  const id = (await rl.question("Digite o ID da peça que você deseja remover: ")).trim();
  const index = registeredParts.findIndex((part) => part.id === id);

  if (index === -1) {
    console.log(`Peça ID ${id} não encontrada.`);
    return;
  }

  registeredParts.splice(index, 1); // remove 1 item na posição encontrada
  reorganizeBoxes();

  console.log(`Peça ID ${id} removida com sucesso!`);
  console.log(`Caixas reorganizadas após a remoção da peça ${id}.`);
}

function listBoxes() {
  if (closedBoxes.length === 0) {
    console.log("Nenhuma caixa fechada até o momento.");
  }

  closedBoxes.forEach((box, index) => {
    const ids = box.map((part) => part.id).join(", ");
    console.log(`📦 Caixa ${index + 1} (fechada) — peças: ${ids}`);
  });

  console.log(`Caixa atual (em aberto): ${currentBox.length}/${boxCapacity} peças.`);
}

function generateReport() {
  const approved = registeredParts.filter((part) => part.status === "Aprovada").length;
  const rejected = registeredParts.length - approved;
  const usedBoxes = closedBoxes.length + (currentBox.length > 0 ? 1 : 0);

  // Conta quantas vezes cada motivo de reprovação aparece
  const reasonCounter = {};
  for (const part of registeredParts) {
    for (const reason of part.reasons) {
      reasonCounter[reason] = (reasonCounter[reason] || 0) + 1;
    }
  }

  console.log("RELATÓRIO FINAL:");
  console.log(`Total de peças cadastradas: ${registeredParts.length}`);
  console.log(`✔ Total de peças aprovadas: ${approved}`);
  console.log(`✘ Total de peças reprovadas: ${rejected}`);
  console.log(`📦 Total de caixas utilizadas (fechadas e em uso): ${usedBoxes}`);

  if (rejected > 0) {
    console.log("Os motivos para reprovação registrados são:");
    for (const [reason, count] of Object.entries(reasonCounter)) {
      console.log(`${reason}: ${count} vez(es)`);
    }
  }
}

// ---------- Programa principal ----------

// Liga cada opção do menu à sua função
const OPTIONS = {
  "1": registerPart,
  "2": listParts,
  "3": removePart,
  "4": listBoxes,
  "5": generateReport,
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
      await action(); // o await funciona tanto para funções async quanto para as comuns
    } else {
      console.log("Opção inválida. Tente novamente.");
    }
  }

  rl.close();
}

main();