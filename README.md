# Projeto uniproduções


## para rodar o projeto

1. Antes de iniciar o projeto, é necessário configurar as variáveis de ambiente. Para isso, copie o ``.env.example`` para ``.env`` e preencha as variáveis de acordo com o ambiente.

```bash
cp .env.example .env # Linux
copy .env.example .env # Windows
```

1.1 E também garantir que as dependencias estejam devidamente instaladas através de:
   ```bash
npm i #ou npm install
yarn #ou yarn install
```


obs: atentar se o servidor está operando em http ou https, o modo do protocolo executado altera a conclusão da integração com este projeto e é necessario corrigir direto na .env

## Execução

1. Inicie o client com

```bash
node start
```

2. Inicie o server de acordo com as instruções do mesmo


