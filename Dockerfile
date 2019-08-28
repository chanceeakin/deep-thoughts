FROM golang:1.12

WORKDIR /usr/src/app

ENV GO111MODULE=on

COPY . .

RUN ["go", "get", "github.com/githubnemo/CompileDaemon"]

ENTRYPOINT ["CompileDaemon", "-log-prefix=false", "-build=\"go build -o bin/app .\"", "-command=\"./bin/app\""]
