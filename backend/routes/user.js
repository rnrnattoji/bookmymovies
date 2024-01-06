const pool = require('../util/db-initializer.js');

module.exports = (app) => {
  app.post("/api/users/get_showtime", (req, res) => {
    const body = req.body;
    const query = 'SELECT * FROM welcome';
    pool.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
    
      console.log(results);
    });
    res.json({"Message": "Success"});
  });
};
