package thoughts

import (
	common "github.com/chanceeakin/deep-thoughts/server/common"
	db "github.com/chanceeakin/deep-thoughts/server/db"
	"log"
	"time"
)

const insertOneSQL = `INSERT INTO thoughts (title, description, created_at)
	VALUES ($1, $2, $3)
  RETURNING id;`
const selectFromGameSQL = `SELECT * FROM thoughts where id=$1;`
const selectAllSQL = `SELECT * FROM thoughts;`

// Thought data object
type Thought struct {
	ID          string     `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	CreatedAt   *time.Time `json:"created_at"`
}

// Input for incoming inserted messages
type Input struct {
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
}

// Thoughts is a slice of message.
type Thoughts struct {
	Thoughts []Thought
}

// PostThought posts a single message
func PostThought(thoughtInput *Input) (common.ID, error) {
	var err error
	out := common.ID{}
	err = db.DB.QueryRow(insertOneSQL, &thoughtInput.Title, &thoughtInput.Description, time.Now()).Scan(&out.ID)
	if err != nil {
		log.Print(err)
		return out, err
	}
	log.Println("New record ID is:", out.ID)
	return out, nil
}

// QueryThoughts returns all messages
func QueryThoughts(thoughts *Thoughts) error {
	rows, err := db.DB.Query(selectAllSQL)
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		thought := Thought{}
		err = rows.Scan(
			&thought.ID,
			&thought.Title,
			&thought.Description,
			&thought.CreatedAt,
		)
		if err != nil {
			return err
		}
		thoughts.Thoughts = append(thoughts.Thoughts, thought)
	}
	err = rows.Err()
	if err != nil {
		return err
	}
	return nil
}

// QueryThought returns a single message
func QueryThought(i *common.ID) (Thought, error) {
	val := Thought{}
	row := db.DB.QueryRow(`SELECT * FROM thoughts where id=$1;`, &i.ID)
	err := row.Scan(
		&val.ID,
		&val.Title,
		&val.Description,
		&val.CreatedAt,
	)
	if err != nil {
		log.Print(err)
		return val, err
	}
	return val, nil
}
