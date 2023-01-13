const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    console.log('connection successfull');
}).catch((error) => {
    console.log(error);
})
