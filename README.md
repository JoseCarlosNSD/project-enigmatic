# project-enigmatic
Projeto pessoal resolução de enigmas.

# instalação do projeto
npm i
npm run dev
sequelize db:seed:all

# instalação do projeto (Docker)

docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
docker build -t enigma -f Dockerfile.dev .
docker run -p 5100:5100 -v $(pwd):/usr/src/app -it --name enigma enigma /bin/bash
npm run dev
sequelize db:seed:all