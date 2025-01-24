const connection = require("../db")

// Definisco gli endpoint dei callback, ovvero i codici che vengono eseguiti in un url specifico
function index(req, res, next) {
  // Ricerca per FILTRO - Prelevo query string params
  const filters = req.query;
  console.log(filters);

  let sql = "SELECT * FROM `movies`";
  const params = [];

  if (filters.search) {
    sql += `
  WHERE title LIKE ?;
  `;
    params.push(`%${filters.search}%`);
  };

  connection.query(sql, params, (err, movies) => {
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
  const sql = `SELECT movies.*, CAST(AVG(reviews.vote) as FLOAT) as vote_avg
  FROM movies
  LEFT JOIN reviews
  ON reviews.movies_id = movies.id
  WHERE movies.id = ? `;

  const sqlReviews = `SELECT movies.*, CAST(AVG(reviews.vote) as FLOAT) as vote_avg
  FROM movies
  LEFT JOIN reviews
  ON movies.id = reviews.movies_id
  WHERE movies.id = ? `;

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