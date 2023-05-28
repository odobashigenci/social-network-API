const { User, Thought } = require("../models")

// thoughts
const thoughtController = {
  // get
  getThought(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // create
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //update 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thoughts were found with the current id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts were found with the current id" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought was deleted, but no user was found'})
          : res.json({ message: 'Thought was deleted successfully' })
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController