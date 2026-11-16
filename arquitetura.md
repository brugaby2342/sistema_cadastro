# ARQUITETURA E CONTEXTO DO SISTEMA

> Propósito deste arquivo: definir o sistema antes de implementá-lo

## 1. Objetivo

**Qual problema precisa ser resolvido?** </br>
O controle manual de qualidade e empacotamento nas indústrias metalúrgicas e mecânicas é lento e sujeito a erros, como a aprovação de peças fora do padrão, caixas com quantidade errada e relatórios imprecisos.

**Quem são os usuários?** </br>
 Proprietários e funcionários de uma linha de montagem industrial.

**Quais resultados o sistema deve entregar?**
- Automatizar o controle de produção; 
- Inspecionar a qualidade e o armazenamento de peças;
  - Aprovar ou reprovar cada peça automaticamente, informando os motivos.
  - Organizar as peças aprovadas em caixas de até 10 unidades.
  - Gerar relatório com totais de peças, caixas e motivos de reprovação.

</br>

## 2. Requisitos

### 2.1 Requisitos Funcionais

Descrevem **o que** o sistema faz.

**Exibir menu principal**

**Cadastrar peça**
ID, peso (em gramas), cor e o comprimento (em centímetros) da peça.

**Validar a qualidade da peça**
Critérios de qualidade **(peso, cor e comprimento)** e classificação **Aprovada** ou **Reprovada**. 

**Armazenar peças aprovadas em caixas**
Adicionar peças aprovadas à caixa aberta. Fechar a caixa quando atingir 10 peças. Iniciar uma nova caixa. Peças reprovadas não serão armazenadas em caixas.

**Listar peças**
Exibir todas as peças cadastradas (ID, status (Aprovada/Reprovada), medidas e, quando houver, as falhas encontradas).

**Remover peça**
Remover uma peça informando o seu ID. Após a remoção, reorganizar as caixas automaticamente. 

**Listar caixas**
Exibir as caixas já fechadas, com as respectivas peças.

**Gerar relatório final**
Relatório com o total de peças cadastradas, aprovadas, reprovadas, total de caixas utilizadas (fechadas e em uso) e a quantidade de ocorrências de cada motivo de reprovação.

**Encerrar o sistema**
Permitir que o usuário encerre o programa por meio de uma opção do menu.

**Tratar entradas inválidas**
Informar ao usuário, quando for digitada uma opção inexistente no menu ou um valor não numérico nos campos de peso e comprimento.

### 2.2 Requisitos Não Funcionais

Descrevem **como** o sistema funciona.

- O sistema deverá ser executado no terminal (linha de comando), utilizando Node.js.

- JavaScript, utilizando apenas os recursos nativos do Node.js, sem bibliotecas externas.

- Nesta primeira versão, os dados serão mantidos apenas em memória durante a execução. Ao encerrar o programa, os dados serão perdidos.

- As mensagens devem ser exibidas em português.

</br>

## 3. Negócio

### Regras de negócio

01. Peso limite: 95 g a 105 g.
02. Cores aceitas: azul ou verde.
03. Comprimento limite: 10 cm a 20 cm. 
04. Aprovada só se atender a todos os critérios.
05. Só peças aprovadas vão para caixas.
06. Máximo de 10 peças por caixa.
07. Ao remover uma peça, as caixas são reconstruídas na ordem de cadastro.

### Entidades principais: 
Peça e Caixa.

</br>

## 4. Arquitetura

O desenvolvimento será feito em duas etapas:
1. **Versão base:** todo o código em um único arquivo (`script.js`), com foco em reproduzir a lógica do sistema original.

sistema_cadastro/
├── `package.json`
└── `script.js`      ← principal: menu + regras, tudo junto

2. **Refatoração:** divisão do código em arquivos separados, isolando a lógica de negócio (validação, caixas e relatório) da interação com o usuário (menu, leitura do teclado e exibição de mensagens), para permitir a evolução futura do sistema para API e front-end sem reescrever as regras.

sistema_cadastro/
├── `package.json`
└── src/
    ├── `index.js`       ← principal: só chama o menu
    ├── `menu.js`        ← menu e interação com o usuário
    ├── `config.js`      ← constantes
    ├── `pecas.js`       ← regras das peças
    ├── `caixas.js`      ← regras das caixas
    └── `relatorio.js`   ← relatório






</br>
</br>
</br>
</br>
</br>
</br>

*Casos a decidir antes de programar:*

*Pode haver ID repetido?*
*Há algum campo opcional?*
*O ID pode ficar vazio?*

*Se o ID não existir, o sistema deve informar que a peça não foi encontrada.*
