package response

import (
	"encoding/json"
	"net/http"
)

// SendJSON writes a struct to the writer
func SendJSON(w http.ResponseWriter, i interface{}) {
	js, err := json.Marshal(i)
	if err != nil {
		http.Error(w, "JSON Error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
