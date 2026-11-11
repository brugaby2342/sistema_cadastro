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

FUNCIONAIS
- Automatizar o controle de produção; 
- Inspecionar a qualidade e o armazenamento de peças;
- Cadastrar peça (ID, peso, cor, comprimento) e validá-la;
- Listar peças por status e falhas;
- Listar caixas fechadas e em andamento;
- Remover peças;
- Gerar relatórios.


NÃO FUNCIONAIS
- Rodará no terminal com Node.js;
- O idioma das mensagens será português;
- Os dados ficarão apenas na memória. Sem banco de dados, por enquanto.

</br>

    3. Negócio

- Regras de negócio
- Entidades principais: peça, estoque, movimentação

</br>

    4. Arquitetura

- O sistema será desenvolvido inicialmente apenas com um back-end em JavaScript, concentrando-se exclusivamente na implementação e demonstração da lógica de negócio.
- Posteriormente, ele poderá evoluir para um sistema completo, com front-end, banco de dados, API e demais componentes necessários.




