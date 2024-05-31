.PHONY: start stop restart seed

start:
	docker start enigma
	docker start mysql
	@echo "Containers iniciados"

stop:
	docker stop enigma
	docker stop mysql
	@echo "Containers parados com sucesso"

restart: stop start
	@echo "Containers reiniciados com sucesso."

seed:
	docker exec -d enigma bash -c "npm run seed"
	@echo "Seed realizado com sucesso."
