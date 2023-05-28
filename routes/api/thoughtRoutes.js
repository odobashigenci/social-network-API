const router = require('express').Router();
const {
  getThought,
  createThought,
  updateThought,
  deleteThought,

} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router
  .route('/:thoughtId')
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
