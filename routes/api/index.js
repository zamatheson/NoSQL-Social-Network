// imports
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// middleware
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// exports
module.exports = router;