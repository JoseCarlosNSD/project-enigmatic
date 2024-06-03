# project-enigmatic
Projeto pessoal resolução de enigmas.

# instalação do projeto
npm i
npm run dev
sequelize db:seed:all

## 🚀 Instalação (Docker) - Instalação Recomendada

> Crie o container do mysql:
```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
```

> Faça o inspect no container do mysql para pegar o ip para o env:
```
docker inspect mysql
```

> Faça a imagme do projeto
```
docker build -t enigma -f Dockerfile.dev .
```

> Construa o container do projeto
```
docker run -p 5100:5100 -v $(pwd):/usr/src/app -it --name enigma enigma /bin/bash
```

> Rode a semente do banco de dados

```
make seed
```

> url local para o projeto http://localhost:5100/

> 💻 OBS: Configure o database e o config colocando no host do banco o ip do inspect do mysql
