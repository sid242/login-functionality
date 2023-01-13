const express = require("express");
require("dotenv").config();
require("./db")
const app = express();
var cors = require('cors')
const port = process.env.API_PORT || 4000

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello")
})
app.use("/api/auth", require("./routes/auth"))



app.listen(4000, () => {
    console.log(`listening at port no ${port}`);
})