#!/bin/bash

# Define a pasta do repositório
REPO_FOLDER=/home/front/htdocs/uniproducoes.com.br

cd $REPO_FOLDER

git fetch origin master

if git rev-parse HEAD..origin/main >/dev/null 2>&1; then
  echo "Nova atualização na main. Executando comando..."
  
  npm install
  npm run build
  yarn global add serve
  pm2 restart front

  echo "Executado em: $current_date" >> /home/front/script_log.txt
else
  echo "$current_date Não há novas atualizações na main". /home/front/script_log.txt
fi