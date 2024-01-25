// imports
const mongoose = require("mongoose");

// establishes mongodb connection
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// exports
module.exports = mongoose.connection;