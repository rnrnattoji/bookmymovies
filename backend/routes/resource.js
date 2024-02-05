const db = require("../util/db-initializer.js");

module.exports = (app) => {
  app.get("/api/resource/getCurrentShowingMovies", async (req, res) => {
    var currentShowingMovies = {};

    const datetime = new Date();
    const currentTimestamp = datetime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const query = `
        SELECT DISTINCT
          l.id AS locationID,
          l.name AS locationName,
          mv.id AS movieID,
          mv.title AS movieTitle,
          mv.image AS movieImageURL
        FROM showtimes s
        INNER JOIN movies mv
        ON s.movieId = mv.id
          INNER JOIN theaters t 
            INNER JOIN multiplexes m 
              INNER JOIN locations l
              ON m.locationId = l.id
            ON t.multiplexId = m.id
          ON s.theaterId = t.id
        WHERE s.showDate > '${currentTimestamp}' AND s.deleted = false;
      `;
    await new Promise((resolve, reject) => {
      db.query(query, (error, rows) => {
        resolve(
          rows.forEach((row) => {
            if (!(row.locationID in currentShowingMovies)) {
              currentShowingMovies[row.locationID] = {
                locationName: row.locationName,
                movies: [
                  {
                    movieID: row.movieID,
                    movieTitle: row.movieTitle,
                    movieImageURL: row.movieImageURL,
                  },
                ],
              };
            } else {
              currentShowingMovies[row.locationID]["movies"].push({
                movieID: row.movieID,
                movieTitle: row.movieTitle,
                movieImageURL: row.movieImageURL,
              });
            }
          })
        );
      });
    });
    res.json(currentShowingMovies);
  });

  // API to fetch all the movies that are not deleted from the DB
  app.get("/api/resource/getMovies", async (req, res) => {
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
};
