const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUsers,
  deleteUsers,
  addFriends,
  deleteFriends
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUsers)
.delete(deleteUsers);

// /api/users/:userId/firends/:friendsId
router.route('/:userId/firends/:freindId')
.post(addFriends)
// .delete(deleteFriends);

module.exports = router;
