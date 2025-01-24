const express = require('express')
const app = express()
const port = 3001
const cors = require("cors")
// Pijio le rotte
const router = require("./routes/movieRoute");
const movieErr = require("./middleware/movieErr");

app.use(express.static("public"));
app.use(express.json());
app.use("/movies", router);

app.get('/', (req, res) => {
  res.send("Aoo weee m'hanno partor... creato!")
})

app.use(cors({
  origin: process.env.FRONTEND_URL
}))

// Middleware per rotte non esistenti
app.use((req, res, next) => {
    res.status(404).send("Dispersi nel mare delle lacrime");
  });

app.use(movieErr);

app.listen(port, () => {
  console.log(`Pronto? Pronto?! Me stai a sentì? ${port}`)
})