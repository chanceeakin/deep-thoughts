package controller

import (
	"encoding/json"
	common "github.com/chanceeakin/deep-thoughts/server/common"
	thought "github.com/chanceeakin/deep-thoughts/server/models/thought"
	response "github.com/chanceeakin/deep-thoughts/server/response"
	routes "github.com/chanceeakin/deep-thoughts/server/routes"
	"io"
	// post gres
	_ "github.com/lib/pq"

	"gopkg.in/go-playground/validator.v9"
	"log"
	"net/http"
)

// ThoughtRoutes is the declaration for all routes
func ThoughtRoutes() []routes.Route {
	thoughtRoutes := make([]routes.Route, 5)
	thoughtRoutes = append(thoughtRoutes, routes.Route{
		Name:        "Thoughts",
		Path:        "/thoughts",
		HandlerFunc: getThoughts,
		Method:      "GET",
	},
		routes.Route{
			Name:        "Thought",
			Path:        "/thought",
			HandlerFunc: getThought,
			Method:      "GET",
		},
		routes.Route{
			Name:        "Post Thought",
			Path:        "/thought",
			HandlerFunc: postThought,
			Method:      "POST",
		},
		routes.Route{
			Name:        "Delete Thought",
			Path:        "/thought",
			HandlerFunc: deleteThought,
			Method:      "DELETE",
		},
		routes.Route{
			Name:        "Update Thought",
			Path:        "/update",
			HandlerFunc: updateThought,
			Method:      "POST",
		},
		routes.Route{
			Name:        "Random Thought",
			Path:        "/random",
			HandlerFunc: randomThought,
			Method:      "GET",
		})
	return thoughtRoutes
}

func getThoughts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `Not Found`, http.StatusNotFound)
		return
	}
	thoughtsArr := thought.Thoughts{}

	err := thought.QueryThoughts(&thoughtsArr)
	if err != nil {
		log.Print(err)
		http.Error(w, `Internal Error`, http.StatusInternalServerError)
		return
	}

	response.SendJSON(w, thoughtsArr)
}

func postThought(w http.ResponseWriter, r *http.Request) {
	var err error
	var thoughtInput thought.Input
	var out common.ID
	v := validator.New()
	decoder := json.NewDecoder(r.Body)

	err = decoder.Decode(&thoughtInput)
	defer r.Body.Close()
	err = v.Struct(thoughtInput)

	switch {
	case err == io.EOF:
	case err != nil:
		response.SendError(w, err, http.StatusBadRequest)
		return
	}

	out, err = thought.PostThought(&thoughtInput)
	if err != nil {
		response.SendError(w, err, http.StatusInternalServerError)
		return
	}
	response.SendJSON(w, out)
}

func getThought(w http.ResponseWriter, r *http.Request) {
	var input common.ID
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&input)
	defer r.Body.Close()
	if err != nil {
		response.SendError(w, err, http.StatusBadRequest)
		return
	}

	val, err1 := thought.QueryThought(&input)
	if err1 != nil {
		response.SendError(w, err1, http.StatusInternalServerError)
		return
	}

	response.SendJSON(w, val)
}

func deleteThought(w http.ResponseWriter, r *http.Request) {
	var input common.ID
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&input)
	defer r.Body.Close()
	if err != nil {
		response.SendError(w, err, http.StatusBadRequest)
		return
	}

	val, err1 := thought.DeleteThought(&input)
	if err1 != nil {
		response.SendError(w, err1, http.StatusInternalServerError)
		return
	}
	response.SendJSON(w, val)
}

func updateThought(w http.ResponseWriter, r *http.Request) {
	var input thought.PutInput
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&input)
	defer r.Body.Close()
	if err != nil {
		response.SendError(w, err, http.StatusBadRequest)
		return
	}

	val, err1 := thought.PutOneThought(&input)
	if err1 != nil {
		response.SendError(w, err1, http.StatusInternalServerError)
		return
	}
	response.SendJSON(w, val)
}

func randomThought(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `Not Found`, http.StatusNotFound)
		return
	}

	val, err := thought.QueryRandomThought()
	if err != nil {
		log.Print(err)
		http.Error(w, `Internal Error`, http.StatusInternalServerError)
		return
	}

	response.SendJSON(w, val)
}
