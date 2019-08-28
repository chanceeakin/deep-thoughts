package app

import (
	"log"
	"net/http"

	controllers "github.com/chanceeakin/deep-thoughts/server/controllers"
	db "github.com/chanceeakin/deep-thoughts/server/db"
	routes "github.com/chanceeakin/deep-thoughts/server/routes"
	"github.com/urfave/negroni"
)

// UGH YES.
// https://thenewstack.io/make-a-restful-json-api-go/

// Routes is the slice of those configs
var Routes = make([]routes.Route, 0)

func init() {
	Routes = append(Routes, controllers.ThoughtRoutes()...)
}

// Run the app
func Run(d *db.InitData) {
	uriString := d.Host + ":" + d.Port
	db.Init(d)
	defer db.CleanUp()

	r := routes.NewRouter(Routes)
	n := negroni.Classic() // Includes some default middlewares
	n.UseHandler(r)
	log.Fatal(http.ListenAndServe(uriString, n))

}
