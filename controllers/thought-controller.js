// import models 
const { Thought, User } = require("../models");

// define thoughtController
const thoughtController = {
// get all thoughts
    async allThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
// get a single thought
    async oneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts found!' });
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
// create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.json(thought, user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts found!' });
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
// delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId,
            });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found!' });
            }
            return res.status(200).json({
                message: "Thought has been successfully deleted.",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
// add a reaction to an existing thought
    async newReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {$addToSet: { reactions: req.body } },
                { runValidators: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: 'No thought found!' });
            }
            return res.status(200).json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
// deletes a reaction 
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                {$pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!reaction) {
                return res
                    .status(404)
                    .json({ message: 'Reaction deleted!'});
            }
            return res.status(200).json(reaction);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};

// export the thoughtController
module.exports = thoughtController;