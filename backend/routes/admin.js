const ObjectId = require("mongodb").ObjectId;

const db = require("../util/db-initializer.js");
const {
  verifyToken,
  verifyUserRole,
  setAccessRoles,
} = require("../util/helper.js");

module.exports = (app) => {
  // API to insert new Movies to Database
  app.post(
    "/api/theaterEmployee/insertMovie",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const body = req.body;

      const datetime = new Date();
      const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");

      const movieId = new ObjectId();

      const dataToInsert = {
        id: movieId.toString(),
        title: body.title,
        image: body.image,
        addedDate: addedDate,
        addedBy: req.userData.userName,
      };

      const query = "INSERT INTO movies SET ?";

      await new Promise((resolve, reject) => {
        resolve(
          db.query(query, dataToInsert, (error, results) => {
            if (error) {
              console.error("Error inserting data:", error);
            }
          })
        );
      });

      res.json({ movieId: movieId.toString() });
    }
  );

  // API to fetch all the movies that are not deleted from the DB
  app.get(
    "/api/theaterEmployee/getMovies",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
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

  // API to update Movie metadata
  app.put(
    "/api/theaterEmployee/updateMovie/:movieId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
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
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to delete Movie
  app.delete(
    "/api/theaterEmployee/deleteMovie/:movieId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const movieId = req.params.movieId;

      const query = "Update movies SET deleted = ? WHERE id = ?";
      const parameters = [1, movieId];

      // const query = "DELETE FROM movies WHERE id = ?"
      // const parameters = [movieId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to insert new Location to Database
  app.post(
    "/api/theaterEmployee/insertLocation",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const body = req.body;

      const datetime = new Date();
      const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");

      const locationId = new ObjectId();

      const dataToInsert = {
        id: locationId.toString(),
        name: body.name,
        addedDate: addedDate,
        addedBy: req.userData.userName,
      };

      const query = "INSERT INTO locations SET ?";
      await new Promise((resolve, reject) => {
        resolve(
          db.query(query, dataToInsert, (error, results) => {
            if (error) {
              console.error("Error inserting data:", error);
            }
          })
        );
      });

      res.json({ locationId: locationId.toString() });
    }
  );

  // API to fetch all the locations that are not deleted from the DB
  app.get(
    "/api/theaterEmployee/getLocations",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const locations = [];

      const query = "SELECT * FROM locations WHERE deleted = false";
      await new Promise((resolve, reject) => {
        db.query(query, (error, rows) => {
          resolve(
            rows.forEach((row) => {
              const rec = {
                id: row.id,
                name: row.name,
                addedDate: row.addedDate,
                addedBy: row.addedBy,
              };
              locations.push(rec);
            })
          );
        });
      });
      res.json(locations);
    }
  );

  // API to update Location metadata
  app.put(
    "/api/theaterEmployee/updateLocation/:locationId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const locationId = req.params.locationId;
      const body = req.body;

      const dataToUpdate = {};

      if ("name" in body) {
        dataToUpdate["name"] = body.name;
      }

      const query =
        "Update locations SET " +
        Object.keys(dataToUpdate)
          .map((key) => `${key} = ?`)
          .join(", ") +
        " WHERE id = ?";
      const parameters = [...Object.values(dataToUpdate), locationId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to delete Location
  app.delete(
    "/api/theaterEmployee/deleteLocation/:locationId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const locationId = req.params.locationId;

      const query = "Update locations SET deleted = ? WHERE id = ?";
      const parameters = [1, locationId];

      // const query = "DELETE FROM locations WHERE id = ?"
      // const parameters = [locationId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to insert new Multiplex to Database
  app.post(
    "/api/theaterEmployee/insertMultiplex",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const body = req.body;

      const datetime = new Date();
      const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");

      const multiplexId = new ObjectId();

      const dataToInsert = {
        id: multiplexId.toString(),
        name: body.name,
        locationId: body.locationId,
        addedDate: addedDate,
        addedBy: req.userData.userName,
      };

      const query = "INSERT INTO multiplexes SET ?";

      await new Promise((resolve, reject) => {
        resolve(
          db.query(query, dataToInsert, (error, results) => {
            if (error) {
              console.error("Error inserting data:", error);
            }
          })
        );
      });

      res.json({ multiplexId: multiplexId.toString() });
    }
  );

  // API to fetch all the multiplexes that are not deleted from the DB
  app.get(
    "/api/theaterEmployee/getMultiplexes",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const multiplexes = [];

      const query = "SELECT * FROM multiplexes WHERE deleted = false";
      await new Promise((resolve, reject) => {
        db.query(query, (error, rows) => {
          resolve(
            rows.forEach((row) => {
              const rec = {
                id: row.id,
                name: row.name,
                locationId: row.locationId,
                addedDate: row.addedDate,
                addedBy: row.addedBy,
              };
              multiplexes.push(rec);
            })
          );
        });
      });
      res.json(multiplexes);
    }
  );

  // API to update Multiplexes metadata
  app.put(
    "/api/theaterEmployee/updateMultiplex/:multiplexId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const multiplexId = req.params.multiplexId;
      const body = req.body;

      const dataToUpdate = {};

      if ("name" in body) dataToUpdate["name"] = body.name;

      if ("locationId" in body) dataToUpdate["locationId"] = body.locationId;

      const query =
        "Update multiplexes SET " +
        Object.keys(dataToUpdate)
          .map((key) => `${key} = ?`)
          .join(", ") +
        " WHERE id = ?";
      const parameters = [...Object.values(dataToUpdate), multiplexId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to delete Multiplex
  app.delete(
    "/api/theaterEmployee/deleteMultiplex/:multiplexId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const multiplexId = req.params.multiplexId;

      const query = "Update multiplexes SET deleted = ? WHERE id = ?";
      const parameters = [1, multiplexId];

      // const query = "DELETE FROM multiplexes WHERE id = ?"
      // const parameters = [multiplexId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );
};
