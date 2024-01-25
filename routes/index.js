// imports
const router = require('express').Router();
const apiRoutes = require('./api');

// routes for the api
router.use('./api', apiRoutes);

// route for incorrect pathway
router.use((req, res) => {
    return res.send('404! Incorrect Route!')
});

// exports 
module.exports = router;