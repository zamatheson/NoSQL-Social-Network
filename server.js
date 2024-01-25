// imports
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// opens connection for server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Success! API Server now running on ${PORT}!`);
    });
});