const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://sid_prajapati:siddharth@cluster0.te48aj3.mongodb.net/adrixus?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
    console.log('connection successfull');
}).catch((error) => {
    console.log(error);
})
