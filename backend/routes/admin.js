const ObjectId = require("mongodb").ObjectId;

const db = require("../util/db-initializer.js");

module.exports = (app) => {
  // Insert New Movies to DB
  app.post("/api/theaterEmployee/insertMovie", (req, res) => {
    const body = req.body;

    const datetime = new Date();
    const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");

    const movieId = new ObjectId();

    const dataToInsert = {
      id: movieId.toString(),
      title: body.title,
      image: body.image,
      addedDate: addedDate,
      addedBy: body.addedBy,
    };

    const query = "INSERT INTO movies SET ?";
    db.query(query, dataToInsert, (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
      }
    });

    res.json({ movieId: movieId.toString() });
  });

  // Fetch all the movies that are not deleted from the DB
  app.get("/api/theaterEmployee/getMovies", async (req, res) => {
    const movies = [];

    const query = "SELECT * FROM movies WHERE deleted = false";
    await new Promise((resolve, reject) => {
      db.query(query, (error, rows) => {
        resolve(
          rows.forEach((row) => {
            const rec = {
              id: row.id,
              title: row.title,
              image: row.image,
              addedDate: row.addedDate,
              addedBy: row.addedBy,
            };
            movies.push(rec);
          })
        );
      });
    });
    res.json(movies);
  });

  // Update Movie metadata
  app.put("/api/theaterEmployee/updateMovie/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const body = req.body;

    const dataToUpdate = {};

    if ("title" in body) {
      dataToUpdate["title"] = body.title;
    }

    if ("image" in body) {
      dataToUpdate["image"] = body.image;
    }

    const query =
      "Update movies SET " +
      Object.keys(dataToUpdate)
        .map((key) => `${key} = ?`)
        .join(", ") +
      " WHERE id = ?";
    const parameters = [...Object.values(dataToUpdate), movieId];

    await new Promise((resolve, reject) => {
      db.query(query, parameters, resolve());
    });
    res.json({ message: "success" });
  });

  // Delete Movie
  app.delete("/api/theaterEmployee/deleteMovie/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const query = "Update movies SET deleted = ? WHERE id = ?";
    const parameters = [1, movieId];

    // const query = "DELETE FROM movies WHERE id = ?"
    // const parameters = [movieId];

    await new Promise((resolve, reject) => {
      db.query(query, parameters, resolve());
    });
    res.json({ message: "success" });
  });
};
