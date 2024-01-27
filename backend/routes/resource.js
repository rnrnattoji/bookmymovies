const db = require("../util/db-initializer.js");

module.exports = (app) => {
  // API to fetch all the movies that are not deleted from the DB
  app.get(
    "/api/resource/getMovies",
    async (req, res) => {
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
    }
  );
};
