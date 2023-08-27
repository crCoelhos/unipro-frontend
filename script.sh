#!/bin/bash

# Define a pasta do repositório
REPO_FOLDER=/home/front/htdocs/uniproducoes.com.br

cd $REPO_FOLDER

git_pull_output=$(git pull origin master)

if [[ "$git_pull_output" != *"Already up to date."* ]]; then
  echo "Nova atualização na master Executando comando..."
  
  npm install
  npm run build
  yarn global add serve
  pm2 restart front

  current_date=$(date +"-%d-%m-%Y %H:%M:%S")
  echo "Executado em: $current_date" >> /home/front/script_log.txt
else
  current_date=$(date +"-%d-%m-%Y %H:%M:%S")
  echo "$current_date Não há novas atualizações na master" >> /home/front/script_log.txt
fi