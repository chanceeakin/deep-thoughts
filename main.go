package main

import (
	"log"

	app "github.com/chanceeakin/deep-thoughts/server/app"
	db "github.com/chanceeakin/deep-thoughts/server/db"
)

const (
	host     = "0.0.0.0"
	port     = "8080"
	dbHost   = "postgres"
	dbPort   = 5432
	user     = "postgres"
	password = "password"
	dbname   = "deep_thoughts"
)

func main() {

	log.Println("Starting deep-thoughts app")
	initData := db.InitData{Host: host, Port: port, User: user, Password: password, Dbname: dbname, DbHost: dbHost, DbPort: dbPort}

	app.Run(&initData)
}
