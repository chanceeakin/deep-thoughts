default:
	@echo "=============building Local API============="
	docker build -f Dockerfile -t deep-thoughts .

compose-up:
	@echo "=============starting api locally============="
	docker-compose up -d

up: default compose-up init-db

logs:
	docker-compose logs -f

down:
	docker-compose down

test:
	go test -v -cover ./...

clean: down
	@echo "=============cleaning up============="
	rm -f deep-thoughts
	docker system prune -f
	docker volume prune -f

init-db:
	psql -h localhost -p 5432 -U postgres -W -c "create database deep_thoughts;"
	psql -h localhost -p 5432 -U postgres -W -d deep_thoughts -f server/sql/init.sql

drop-db:
	psql -h localhost -p 5432 -U postgres -W -c "drop database deep_thoughts;"
