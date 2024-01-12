const ObjectId = require("mongodb").ObjectId;

const { extractDayFromTimestamp } = require("../util/common.js");
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

  // API to insert new Theaters to Database
  app.post(
    "/api/theaterEmployee/insertTheater",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const body = req.body;

      const datetime = new Date();
      const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");

      const theaterId = new ObjectId();

      const dataToInsert = {
        id: theaterId.toString(),
        name: body.name,
        seatingCapacity: body.seatingCapacity,
        multiplexId: body.multiplexId,
        addedDate: addedDate,
        addedBy: req.userData.userName,
      };

      const query = "INSERT INTO theaters SET ?";

      await new Promise((resolve, reject) => {
        resolve(
          db.query(query, dataToInsert, (error, results) => {
            if (error) {
              console.error("Error inserting data:", error);
            }
          })
        );
      });

      res.json({ theaterId: theaterId.toString() });
    }
  );

  // API to fetch all the theaters that are not deleted from the DB
  app.get(
    "/api/theaterEmployee/getTheaters",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const theaters = {};

      const query = "SELECT * FROM theaters WHERE deleted = false;";
      await new Promise((resolve, reject) => {
        db.query(query, (error, rows) => {
          resolve(
            rows.forEach((row) => {
              const rec = {
                id: row.id,
                name: row.name,
                seatingCapacity: row.seatingCapacity,
                addedDate: row.addedDate,
                addedBy: row.addedBy,
              };
              if (row.multiplexId in theaters) {
                theaters[row.multiplexId].push(rec);
              } else {
                theaters[row.multiplexId] = [rec];
              }
            })
          );
        });
      });
      res.json(theaters);
    }
  );

  // API to update Theater metadata
  app.put(
    "/api/theaterEmployee/updateTheater/:theaterId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const theaterId = req.params.theaterId;
      const body = req.body;

      const dataToUpdate = {};

      if ("name" in body) dataToUpdate["name"] = body.name;

      if ("multiplexId" in body) dataToUpdate["multiplexId"] = body.multiplexId;

      if ("seatingCapacity" in body)
        dataToUpdate["seatingCapacity"] = body.seatingCapacity;

      const query =
        "Update theaters SET " +
        Object.keys(dataToUpdate)
          .map((key) => `${key} = ?`)
          .join(", ") +
        " WHERE id = ?";
      const parameters = [...Object.values(dataToUpdate), theaterId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to delete Theater
  app.delete(
    "/api/theaterEmployee/deleteTheater/:theaterId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const theaterId = req.params.theaterId;

      const query = "Update theaters SET deleted = ? WHERE id = ?";
      const parameters = [1, theaterId];

      // const query = "DELETE FROM theaters WHERE id = ?"
      // const parameters = [theaterId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to insert new Showtime to Database
  app.post(
    "/api/theaterEmployee/insertShowtime",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const body = req.body;

      const inputShowDate = new Date(body.showDate);

      const showDate = body.showDate.slice(0, 19).replace("T", " ");
      const showDay = extractDayFromTimestamp(inputShowDate);

      const datetime = new Date();
      const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");

      const showtimeId = new ObjectId();

      const dataToInsert = {
        id: showtimeId.toString(),
        theaterId: body.theaterId,
        movieId: body.movieId,
        showDate: showDate,
        showDay: showDay,
        addedDate: addedDate,
        addedBy: req.userData.userName,
        price: body.price,
      };

      const query = "INSERT INTO showtimes SET ?";
      await new Promise((resolve, reject) => {
        resolve(
          db.query(query, dataToInsert, async (error, results) => {
            if (error) {
              console.error("Error inserting data:", error);
            }
            if (showDay == "TUESDAY" || new Date(showDate).getHours() < 18) {
              const discountId = new ObjectId();
              const dataToInsertDiscount = {
                id: discountId.toString(),
                showtimeId: showtimeId.toString(),
                addedDate: addedDate,
                addedBy: req.userData.userName,
                modifiedDate: addedDate,
                modifiedBy: req.userData.userName,
              };

              const queryDiscount = "INSERT INTO discounts SET ?";
              await new Promise((resolve, reject) => {
                resolve(
                  db.query(
                    queryDiscount,
                    dataToInsertDiscount,
                    (error, results) => {
                      if (error) {
                        console.error("Error inserting data:", error);
                      }
                    }
                  )
                );
              });
            }
          })
        );
      });

      res.json({ showtimeId: showtimeId.toString() });
    }
  );

  // API to fetch all the showtimes that are not deleted from the DB
  app.get(
    "/api/theaterEmployee/getShowtimes",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const showtimes = [];

      const query = "SELECT * FROM showtimes WHERE deleted = false;";
      await new Promise((resolve, reject) => {
        db.query(query, (error, rows) => {
          resolve(
            rows.forEach((row) => {
              const rec = {
                id: row.id,
                theaterId: row.theaterId,
                movieId: row.movieId,
                showDate: row.showDate,
                showDay: row.showDay,
                price: row.price,
                addedDate: row.addedDate,
                addedBy: row.addedBy,
              };
              showtimes.push(rec);
            })
          );
        });
      });
      res.json(showtimes);
    }
  );

  // API to update Showtime data
  app.put(
    "/api/theaterEmployee/updateShowtime/:showtimeId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const showtimeId = req.params.showtimeId;
      const body = req.body;

      const dataToUpdate = {};

      if (!("showDate" in body)) {
        return res.status(400).json({ message: "Please provide showDate" });
      }

      const inputShowDate = new Date(body.showDate);
      const showDate = body.showDate.slice(0, 19).replace("T", " ");
      const showDay = extractDayFromTimestamp(inputShowDate);

      dataToUpdate["showDate"] = showDate;
      dataToUpdate["showDay"] = showDay;

      const query =
        "Update showtimes SET " +
        Object.keys(dataToUpdate)
          .map((key) => `${key} = ?`)
          .join(", ") +
        " WHERE id = ?";
      const parameters = [...Object.values(dataToUpdate), showtimeId];
      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });

      var count = 0;
      const queryCount = `SELECT COUNT(id) FROM discounts WHERE (showtimeId = '${showtimeId}' AND deleted = false);`;
      await new Promise((resolve, reject) => {
        db.query(queryCount, (error, rows) => {
          resolve(
            rows.forEach((record) => {
              if ("COUNT(id)" in record) {
                count += record["COUNT(id)"];
              }
            })
          );
        });
      });

      if (showDay == "TUESDAY" || new Date(showDate).getHours() < 18) {
        if (count == 0) {
          const discountId = new ObjectId();
          const datetime = new Date();
          const addedDate = datetime
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          const dataToInsertDiscount = {
            id: discountId.toString(),
            showtimeId: showtimeId,
            addedDate: addedDate,
            addedBy: req.userData.userName,
            modifiedDate: addedDate,
            modifiedBy: req.userData.userName,
          };

          const queryDiscount = "INSERT INTO discounts SET ?";
          await new Promise((resolve, reject) => {
            resolve(
              db.query(
                queryDiscount,
                dataToInsertDiscount,
                (error, results) => {
                  if (error) {
                    console.error("Error inserting data:", error);
                  }
                }
              )
            );
          });
        }
      } else {
        if (count > 0) {
          const queryDiscountDelete =
            "Update discounts SET deleted = ? WHERE showtimeId = ?";
          const parameters = [1, showtimeId];

          // const query = "DELETE FROM discounts WHERE showtimeId = ?"
          // const parameters = [showtimeId];

          await new Promise((resolve, reject) => {
            resolve(db.query(queryDiscountDelete, parameters));
          });
        }
      }

      return res.json({ message: "success" });
    }
  );

  // API to delete Showtime
  app.delete(
    "/api/theaterEmployee/deleteShowtime/:showtimeId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const showtimeId = req.params.showtimeId;

      const query = "Update showtimes SET deleted = ? WHERE id = ?";
      const parameters = [1, showtimeId];

      // const query = "DELETE FROM showtimes WHERE id = ?"
      // const parameters = [showtimeId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });

      const queryDiscountDelete =
        "Update discounts SET deleted = ? WHERE showtimeId = ?";
      const parametersDiscount = [1, showtimeId];

      // const query = "DELETE FROM discounts WHERE showtimeId = ?"
      // const parameters = [showtimeId];

      await new Promise((resolve, reject) => {
        resolve(db.query(queryDiscountDelete, parametersDiscount));
      });

      res.json({ message: "success" });
    }
  );

  // API to fetch all the discounts that are not deleted from the DB
  app.get(
    "/api/theaterEmployee/getDiscounts",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const discounts = [];

      const query = "SELECT * FROM discounts WHERE deleted = false;";
      await new Promise((resolve, reject) => {
        db.query(query, (error, rows) => {
          resolve(
            rows.forEach((row) => {
              const rec = {
                id: row.id,
                showtimeId: row.showtimeId,
                addedDate: row.addedDate,
                addedBy: row.addedBy,
                percentage: row.percentage,
                modifiedDate: row.modifiedDate,
                modifiedBy: row.modifiedBy,
              };
              discounts.push(rec);
            })
          );
        });
      });
      res.json(discounts);
    }
  );

  // API to update Discount metadata
  app.put(
    "/api/theaterEmployee/updateDiscount/:discountId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const discountId = req.params.discountId;
      const body = req.body;

      const dataToUpdate = {};

      if (!("percentage" in body)) {
        return res.status(400).json({ message: "Please provide percentage" });
      }

      const datetime = new Date();
      const modifiedDate = datetime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      dataToUpdate["percentage"] = body.percentage;
      dataToUpdate["modifiedDate"] = modifiedDate;
      dataToUpdate["modifiedBy"] = req.userData.userName;

      const query =
        "Update discounts SET " +
        Object.keys(dataToUpdate)
          .map((key) => `${key} = ?`)
          .join(", ") +
        " WHERE id = ?";
      const parameters = [...Object.values(dataToUpdate), discountId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );

  // API to delete Discount
  app.delete(
    "/api/theaterEmployee/deleteDiscount/:discountId",
    setAccessRoles(["admin"]),
    verifyToken,
    verifyUserRole,
    async (req, res) => {
      const discountId = req.params.discountId;

      const query = "Update discounts SET deleted = ? WHERE id = ?";
      const parameters = [1, discountId];

      // const query = "DELETE FROM discount WHERE id = ?"
      // const parameters = [discountId];

      await new Promise((resolve, reject) => {
        resolve(db.query(query, parameters));
      });
      res.json({ message: "success" });
    }
  );
};
