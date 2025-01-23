const express = require('express')
const app = express()
const port = 3001
// Pijio le rotte
const router = require("./routes/movieRoute");

app.use("/movies", router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})