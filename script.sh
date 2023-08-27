#!/bin/bash

# Define a pasta do repositório
REPO_FOLDER=/home/api/htdocs/uniproducoes.com.br

cd $REPO_FOLDER

git fetch origin main

if git rev-parse HEAD..origin/main >/dev/null 2>&1; then
  echo "Nova atualização na main. Executando comando..."
  
  npm install
  npm run build
  yarn global add serve
  npx serve -s build
  pm2 start npm --name front -- start
  pm2 save
  
  echo "Comando executado com sucesso."
else
  echo "Não há novas atualizações na main."
fi
