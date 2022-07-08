// import all libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

// setup connections
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to DB 🔌"))
    .catch(() => console.log("Couldn't connect to db ❌"));

// setup middlewares
app.use(cors()); // CORS => Cross origin resource sharing; // share frontend <-> backend
app.use(express.json());

// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}

// setup routes
app.get("/", (req, res) => {
  return res.json({message: "API Success!"})
})

app.use("/api/external", require("./routes/external"));
app.use("/api/location", require("./routes/location"));
app.use ("/api/alerts", require("./routes/alert"));

// start listening on server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running... on port ${process.env.PORT}`);
})