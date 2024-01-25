const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateExistingUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createNewUser);

router
.route('/:userId')
.get(getOneUser)
.put(updateExistingUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);

module.exports = router;