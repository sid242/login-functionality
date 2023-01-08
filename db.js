const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/iNootbook").then(() => {
    console.log('connection successfull');
}).catch((error) => {
    console.log(error);
})
