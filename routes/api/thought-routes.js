const router = require('express').Router();

const {
    allThoughts,
    oneThought,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/').get(allThoughts).post(createThought);

router.route('/:thoughtId').get(oneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(newReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;