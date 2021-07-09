const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

// Configuring dotenv 
dotenv.config({ path: "config/config.env" });

// Creating port
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: false }));


// connecting to mongodb
require("./db/connection");

app.get("/", (req, res) => {
    return res.send("THis is fine")
})

// adding auth routes
app.use(require("./routes/authRoutes"));

// Listening to the server
app.listen(PORT, () =>
{
    console.log(`Server running on port http://localhost:${ PORT }/`);
})