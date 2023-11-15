# Requisitos e Descrição - Sistema de Lista de Tarefas

## Descrição detalhada do domínio da aplicação

### Introdução

O sistema que estamos desenvolvendo é um aplicativo de gerenciamento de tarefas, projetado para ajudar os usuários a organizar e acompanhar suas atividades diárias, projetos e objetivos. Ele serve como uma ferramenta digital para gerenciamento de tempo e produtividade, permitindo que os usuários criem, modifiquem, e monitorem tarefas e categorias de tarefas.

### Objetivo do Sistema

O principal objetivo do sistema é fornecer uma interface intuitiva e eficaz para que os usuários possam gerenciar suas tarefas com facilidade e eficiência. Ele visa aumentar a produtividade dos usuários, ajudando-os a se manterem organizados e focados em suas atividades.

### Funcionalidades do Sistema

1. **Gerenciamento de Tarefas**: O sistema permite que os usuários criem, renomeiem, excluam, reordenem, e marquem tarefas como concluídas ou não concluídas. Cada tarefa pode ser atribuída a uma categoria específica para melhor organização.

2. **Gerenciamento de Categorias**: Os usuários podem criar categorias para agrupar tarefas relacionadas. Eles podem renomear, reordenar e excluir categorias, bem como visualizar tarefas associadas a cada categoria.

3. **Usuários e Autenticação**: O sistema conta com um mecanismo de autenticação baseado em nome de usuário. Os usuários podem fazer login e logout, e o sistema reconhece seus estados de login para fornecer acesso adequado às funcionalidades.

### Detalhamento do domínio: Tarefas e Categorias

- **Tarefas**: Representam ações ou atividades que o usuário deseja realizar. Podem ser simples (como "Comprar leite") ou mais complexas (como "Preparar apresentação para a reunião de segunda-feira").

- **Categorias**: São agrupamentos de tarefas que permitem aos usuários organizar suas atividades em segmentos lógicos, como "Trabalho", "Casa", "Estudos", etc.

### Público-Alvo

O sistema é destinado a indivíduos que buscam uma ferramenta para gerenciar suas atividades diárias, profissionais que precisam de uma ferramenta de organização para seus projetos, estudantes que desejam gerenciar seus estudos e prazos, e qualquer pessoa que precise de um sistema para acompanhar suas tarefas e responsabilidades.

## Requisitos Funcionais

### Gerenciamento de Tarefas

1. **Criar Tarefa**: Usuários logados devem ser capazes de criar novas tarefas.

2. **Renomear Tarefa**: Usuários logados devem ter a opção de alterar o nome de uma tarefa existente.

3. **Excluir Tarefa**: Usuários logados devem poder excluir uma tarefa.

4. **Reordenar Tarefa em uma Categoria**: Os usuários devem ser capazes de alterar a ordem das tarefas dentro de uma categoria.

5. **Desmarcar Tarefa como Concluída**: Se uma tarefa foi marcada como concluída, deve haver uma opção para revertê-la para o estado não concluído.

6. **Marcar Tarefa como Concluída**: Usuários devem poder marcar uma tarefa como concluída.

### Gerenciamento de Categorias

1. **Reordenar Categoria**: Usuários logados devem ser capazes de alterar a ordem das categorias.

2. **Renomear Categoria**: Usuários logados devem ter a opção de alterar o nome de uma categoria existente.

3. **Listar Categorias com Tarefas**: O sistema deve ser capaz de exibir uma lista de categorias junto com suas tarefas associadas.

4. **Criar Categoria de Tarefas**: Usuários logados devem poder criar novas categorias de tarefas.

5. **Excluir Categoria com suas Tarefas**: Usuários logados devem poder excluir uma categoria e todas as suas tarefas associadas.

## Requisitos Não Funcionais

### Requisitos de Acesso

1. **Fazer Login com Nome de Usuário**: O sistema deve permitir que os usuários façam login usando um nome de usuário, enviando-os para a página de listagem de tarefas.

2. **Fazer logou**: O sistema deve permitir que os usuários façam logout, enviando-os de volta para a página de login.

### Usuários e Autenticação

1. **Usuário Logado**: O sistema deve suportar um estado onde os usuários estão logados.

2. **Usuário deslogado**: O sistema deve suportar um estado onde os usuários estão deslogados.

3. **Acesso deslogado**: O sistema deve reconhecer quando um usuário não está logado e redirecioná-lo para a página de login caso tente acessar outra página.

4. **Acesso logado**: O sistema deve reconhecer que o usuário está logado e redirecioná-lo para a página de tarefas caso acesse a página de login.

## Observações

- Todos os casos de uso têm como pré-requisito o caso de uso "Fazer login com nome de usuário", mas as dependências são omitidas para melhorar a legibilidade do diagrama.
- Para simplificar o escopo do projeto, o sistema vai considerar apenas o nome de usuário como credencial de autenticação.
