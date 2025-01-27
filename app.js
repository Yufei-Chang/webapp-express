const express = require('express')
const app = express()
const port = 3001
const cors = require("cors")
// Pijio le rotte
const router = require("./routes/movieRoute");
const movieErr = require("./middleware/movieErr");
const notFound = require('./middleware/notFound');

require("dotenv").config();
// Rendo disponibile chiamata a server tramite cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.static("public"));
app.use(express.json());
app.use("/movies", router);

app.get('/', (req, res) => {
  res.send("Aoo weee m'hanno partor... creato!")
})

app.use(cors({
  origin: process.env.FRONTEND_URL
}))

app.use(movieErr);

// Middleware per rotte non esistenti
app.use(notFound);

app.listen(port, () => {
  console.log(`Pronto? Pronto?! Me stai a sentì? ${port}`)
})