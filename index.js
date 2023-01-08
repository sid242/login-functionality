const express = require("express");
require("./db")
const app = express();
var cors = require('cors')
const port = 3500;

app.use(cors())
app.use(express.json())


app.use("/api/auth", require("./routes/auth"))


app.listen(port, () => {
    console.log(`listening at port no ${port}`);
})