# Descrição arquitetural do sistema

## Arquitetura Lógica

- **Banco de Dados**: A base da arquitetura é um banco de dados que armazena todas as informações pertinentes ao sistema de lista de tarefas.

- **Servidor Backend**: Acima do banco de dados, temos o servidor backend. Há uma comunicação TCP/IP entre o banco de dados e este servidor backend.

- **Servidor Frontend**: Na camada mais alta, encontra-se o servidor frontend. A comunicação entre o servidor backend e o servidor frontend é feita via HTTP Cliente/Servidor usando uma API Rest.

## Arquitetura Física

- **Railway**: A plataforma Railway fornece dois serviços distintos: um para hospedagem de banco de dados e outro para hospedagem de aplicações, chamado "railway.app".

- **Banco de Dados**: Utiliza o serviço da Railway para hospedagem do banco de dados.

- **Servidor Backend**: Utiliza o serviço "railway.app" para hospedagem da aplicação backend. A comunicação com o banco de dados utiliza o protocolo TCP/IP.

- Vercel: O servidor frontend está sendo hospedado na Vercel, e a comunicação entre o backend e o frontend é feita via HTTP Cliente/Servidor utilizando uma API Rest.

## Observações

As arquiteturas são estruturadas de maneira a separar as responsabilidades entre o armazenamento de dados, a lógica de negócios no backend e a apresentação no frontend, permitindo uma melhor gestão e manutenção do sistema. A hospedagem em plataformas como Railway e Vercel usa os conceitos de infraestrutura como serviço (IaaS) e plataforma como serviço (PaaS), que oferecem escalabilidade e facilidade de deploy.
