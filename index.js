const express = require("express");
require("dotenv").config();
require("./db")
const app = express();
var cors = require('cors')
const port = process.env.API_PORT

app.use(cors())
app.use(express.json())


app.use("/api/auth", require("./routes/auth"))


app.listen(port, () => {
    console.log(`listening at port no ${port}`);
})