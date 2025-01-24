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

function show(req, res, next) {
  const urlId = req.params.id;

  const sql = `
    SELECT movies.*, CAST(AVG(reviews.vote) as FLOAT) as vote_avg
    FROM movies
    LEFT JOIN reviews
    ON reviews.movies_id = movies.id
    WHERE movies.id = ? 
  `;

  const sqlReviews = `
    SELECT reviews:*
    FROM reviews
    JOIN movies
    ON movies.id = reviews.movies_id
    WHERE movies.id = ? 
  `;

  connection.query(sql, [urlId], (err, results) => {
    if (err) {
      return next(new Error(err.message));
    }

    // Controllo se è stata trovata la corrispondenza
    if (results.length === 0 || results[0].id === null) {
      return res.status(404).json({
        status: "Fail",
        message: "Sicuro di aver scritto bene?",
      });
    };

    // Se l'esito è positivo, prendiamo le recensioni relative al libro
    connection.query(sqlReviews, [urlId], (err, reviews) => {
      if (err) {
        return next(new Error(err.message));
      }

      return res.status(200).json({
        status: "Sul cess",
        data: {
          ...results[0],
          reviews,
        },
      });
    });
  });
};

module.exports = { index, show };