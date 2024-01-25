// import models
const { User, Thought } = require('../models');

// define userController
const userController = {
// gets all users
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
                .select('-_v')
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// get one user
    async getOneUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
                .select('-_v')
                .populate('friends')
                .populate('thoughts')
            !userData
            ? res.status(404).json({ message: 'User not found!' })
            : res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// create a new user
    async createNewUser(req, res) {
        try {
            const userData = await User.create(req.body)
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// update a user
    async updateExistingUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            !userData
                ? res.status(404).json({ message: 'User not found!' })
                : res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            return res.status(200).json({ message: 'User has been deleted!' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

    },
// add a user as a friend
    async addNewFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'User not found!' });
            }
            return res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);        
        }
    },
// delete a friend
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                return res.status(404).json({ message: 'Error deleting friend' });
            }
            return res.status(200).json(friend);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};

// export the userController
module.exports = userController