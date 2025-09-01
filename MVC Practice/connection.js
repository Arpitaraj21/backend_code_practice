const mongoose = require("mongoose");

// Connection
async function connectMongoDB(url) {
   return mongoose.connect(url)
    .then(() => console.log('successfully connected the database') )
    .catch((err) => console.log("mongoDb error", err))
}


module.exports = {
    connectMongoDB,
}