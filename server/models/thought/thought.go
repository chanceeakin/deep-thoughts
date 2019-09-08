package thoughts

import (
	common "github.com/chanceeakin/deep-thoughts/server/common"
	db "github.com/chanceeakin/deep-thoughts/server/db"
	"log"
	"time"
)

const insertOneSQL = `INSERT INTO thoughts (title, deep_thought, author, created_at)
	VALUES ($1, $2, $3, $4)
  RETURNING id;`
const selectOneSQL = `SELECT id, title, deep_thought, author, created_at FROM thoughts where id=$1;`
const selectAllSQL = `SELECT id, title, deep_thought, author, created_at FROM thoughts;`
const selectOneRandomSQL = `select id, title, deep_thought, author, created_at from thoughts ORDER BY random() limit 1;`
const updateOneSQL = `UPDATE thoughts SET title=$1, deep_thought=$2, author=$3 WHERE id=$4 RETURNING id;`
const deleteOneSQL = `DELETE FROM thoughts WHERE id=$1 RETURNING id;`

// Thought data object
type Thought struct {
	ID          string     `json:"id"`
	Title       string     `json:"title"`
	DeepThought string     `json:"deep_thought"`
	Author      string     `json:"author"`
	CreatedAt   *time.Time `json:"created_at"`
}

// Input for incoming inserted messages
type Input struct {
	Title       string `json:"title" validate:"required"`
	Author      string `json:"author" validate:"required"`
	DeepThought string `json:"deep_thought" validate:"required"`
}

// PutInput for incoming inserted messages
type PutInput struct {
	ID          string `json:"id" validate:"required"`
	Title       string `json:"title" validate:"required"`
	Author      string `json:"author" validate:"required"`
	DeepThought string `json:"deep_thought" validate:"required"`
}

// Thoughts is a slice of message.
type Thoughts struct {
	Thoughts []Thought
}

// PostThought posts a single message
func PostThought(thoughtInput *Input) (common.ID, error) {
	var err error
	out := common.ID{}
	err = db.DB.QueryRow(insertOneSQL, &thoughtInput.Title, &thoughtInput.DeepThought, &thoughtInput.Author, time.Now()).Scan(&out.ID)
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
		val := Thought{}
		err = rows.Scan(
			&val.ID,
			&val.Title,
			&val.DeepThought,
			&val.Author,
			&val.CreatedAt,
		)
		if err != nil {
			return err
		}
		thoughts.Thoughts = append(thoughts.Thoughts, val)
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
	row := db.DB.QueryRow(selectOneSQL, &i.ID)
	err := row.Scan(
		&val.ID,
		&val.Title,
		&val.DeepThought,
		&val.Author,
		&val.CreatedAt,
	)
	if err != nil {
		log.Print(err)
		return val, err
	}
	return val, nil
}

// QueryRandomThought grabs a random record from the DB
func QueryRandomThought() (Thought, error) {
	val := Thought{}
	err := db.DB.QueryRow(selectOneRandomSQL).Scan(
		&val.ID,
		&val.Title,
		&val.DeepThought,
		&val.Author,
		&val.CreatedAt,
	)
	if err != nil {
		log.Print(err)
		return val, err
	}
	return val, nil
}

// DeleteThought deletes a random record rom teh db
func DeleteThought(i *common.ID) (common.ID, error) {
	val := common.ID{}
	err := db.DB.QueryRow(deleteOneSQL, &i.ID).Scan(&val.ID)
	if err != nil {
		log.Print(err)
		return val, err
	}
	return val, nil
}

// PutOneThought updates a thought.
func PutOneThought(i *PutInput) (common.ID, error) {
	val := common.ID{}
	err := db.DB.QueryRow(updateOneSQL, &i.Title, &i.DeepThought, &i.Author, &i.ID).Scan(&val.ID)
	if err != nil {
		log.Print(err)
		return val, err
	}
	return val, nil

}
