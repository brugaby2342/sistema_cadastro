import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

/*
PESO: 95g a 105g
COR: azul ou verde
TAMANHO: 10cm a 20cm
CAIXA: 10 peças
*/

const weightMin = 95
const weightMax = 105
const lengthMin = 10
const lengthMax = 20
const validColors = "blue" || "green"
const amountBox = 10

