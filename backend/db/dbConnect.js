const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log("Connection failed to DB", err);
    })

module.exports = mongoose
