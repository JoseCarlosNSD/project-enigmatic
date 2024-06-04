# project-enigmatic
Projeto pessoal resolução de enigmas.

# instalação do projeto
npm i
npm run dev
sequelize db:seed:all

## 🚀 Instalação (Docker) - Instalação Recomendada

> Crie uma network para o banco de dados:
```
docker network create --subnet 10.0.0.0/16 dbnetwork
```

> Crie o container do mysql:
```
docker run --name mysql --network=dbnetwork --ip=10.0.0.3 -e MYSQL_ROOT_PASSWORD=root -d mysql
```

> Faça a imagem do projeto
```
docker build -t enigma -f Dockerfile.dev .
```

> Construa o container do projeto
```
docker run -p 5100:5100 -v $(pwd):/usr/src/app -it --name enigma enigma /bin/bash
```

> Conecte o projeto com a network do banco de dados
```
docker network connect dbnetwork enigma
```

> Rode a semente do banco de dados

```
make seed
```

> url local para o projeto http://localhost:5100/

> 💻 OBS: Configure o database e o config colocando no host do banco o ip 10.0.0.3
