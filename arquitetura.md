# ARQUITETURA E CONTEXTO DO SISTEMA

> Propósito deste arquivo: definir o sistema antes de implementá-lo

    1. Objetivo

- Qual problema precisa ser resolvido? </br>
O controle manual de qualidade e empacotamento nas indústrias metalúrgicas e mecânicas é lento e sujeito a erros, como a aprovação de peças fora do padrão, caixas com quantidade errada e relatórios imprecisos.

- Quem são os usuários? </br>
 Proprietários e funcionários de uma linha de montagem industrial.

- Quais resultados o sistema deve entregar?
  - Aprovar ou reprovar cada peça automaticamente, informando os motivos.
  - Organizar as peças aprovadas em caixas de até 10 unidades.
  - Gerar relatório com totais de peças, caixas e motivos de reprovação.

</br>

    2. Requisitos

### Funcionais
- Automatizar o controle de produção; 
- Inspecionar a qualidade e o armazenamento de peças;
- Cadastrar peça (ID, peso, cor, comprimento) e validá-la;
- Listar peças por status e falhas;
- Listar caixas fechadas e em andamento;
- Remover peças;
- Gerar relatórios.


### Não Funcionais
- Rodará no terminal com Node.js;
- O idioma das mensagens será português;
- Os dados ficarão apenas na memória. Sem banco de dados, por enquanto.

</br>

    3. Negócio

### Regras de negócio

01. Peso limite: 95 g a 105 g
02. Cores aceitas: azul ou verde
03. Comprimento limite: 10 cm a 20 cm 
04. Aprovada só se atender a todos os critérios
05. Só peças aprovadas vão para caixas
06. Máximo de 10 peças por caixa
07. Ao remover uma peça, as caixas são reconstruídas na ordem de cadastro

### Entidades principais: 
Peça e Caixa

</br>

    4. Arquitetura

> O sistema será desenvolvido inicialmente apenas com um back-end em JavaScript, concentrando-se exclusivamente na implementação e demonstração da lógica de negócio. Posteriormente, ele poderá evoluir para um sistema completo, com front-end, banco de dados, API e demais componentes necessários.
- Para este fim, a estrutura:
`menu.js` - arquivo de interação com o usuário
`pecas.js`; `caixas.js`; `relatorio.js` - arquivos para receber e devolver dados. 

</br>
</br>
</br>
</br>
</br>
</br>

Casos a decidir antes de programar:

Pode haver ID repetido?
O que acontece se a pessoa digitar texto no campo de peso?
Há algum campo opcional?
O ID pode ficar vazio?

