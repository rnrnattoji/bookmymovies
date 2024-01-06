const ObjectId = require("mongodb").ObjectId;

const db = require("../util/db-initializer.js");

module.exports = (app) => {
  // Insert New Movies to DB
  app.post("/api/theater_employee/insert_movie", (req, res) => {
    const body = req.body;

    const datetime = new Date();
    const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");

    const objectId = new ObjectId();

    const dataToInsert = {
      id: objectId.toString(),
      title: body.title,
      image: body.image,
      addedDate: addedDate,
      addedBy: body.addedBy,
    };

    const query = "INSERT INTO movies SET ?";
    db.query(query, dataToInsert, (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        return;
      }
      console.log("Inserted data successfully:", results);
    });

    res.json({ movieId: objectId.toString() });
  });

  // Fetch all the movies that are not deleted from the DB
  app.get("/api/theater_employee/get_movies", async (req, res) => {
    const movies = [];
    await new Promise((resolve, reject) => {
      db.query("SELECT * FROM movies WHERE deleted = false", function (error, rows) {
        if (error) {
          console.error("Error fetching data:", error);
          return reject(err);
        }
        resolve(
          rows.forEach((row) => {
            const rec = {
              "Id": row.id,
              "Title:": row.title,
              "Image": row.image,
              "addedDate": row.addedDate,
              "addedBy": row.addedBy,
              "deleted": row.deleted
            };
            movies.push(rec);
          })
        );
      });
    });
    res.json(movies);
  });
};
