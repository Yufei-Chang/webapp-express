const connection = require("../db")

// Definisco gli endpoint dei callback, ovvero i codici che vengono eseguiti in un url specifico
function index(req, res) {
    const sql = "SELECT * FROM movies";

    connection.query(sql, (err, movies) => {
        if (err) {
          return next(new Error(err.message));
        }
    
        return res.status(200).json({
          status: "success",
          data: movies,
        });
      });
    }

function show(req, res) {
    const urlId = req.params.id;
    const sql = "SELECT * FROM movies WHERE id = ?";

    connection.query(sql, [urlId], (err, movies) => {
        if (err) {
          return next(new Error(err.message));
        }
    
        return res.status(200).json({
          status: "success",
          data: movies,
        });
      });
}

module.exports = { index, show }