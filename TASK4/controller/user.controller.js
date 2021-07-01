const { responseCodesEnum } = require('../constants');
const { User } = require('../database');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res
        .status(responseCodesEnum.OK)
        .json(users);
    } catch (e) {
      console.log(e);
    }
  },
  addNewUser: async (req, res) => {
    try {
      if (!req.userExists) {
        await User.create(req.body);
        res
          .status(responseCodesEnum.CREATED)
          .json(req.body);
        return;
      }
      res
        .status(responseCodesEnum.NO_CONTENT)
        .json(req.body);
    } catch (e) {
      console.log(e);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res
        .status(responseCodesEnum.OK)
        .json(user);
    } catch (e) {
      console.log(e);
    }
  },
  removeUserById: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.userId);
      res
        .status(responseCodesEnum.OK)
        .json({ msg: 'remove user by id', id: req.params.userId });
    } catch (e) {
      console.log(e);
    }
  },
  editUserById: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, req.body);
      res
        .status(responseCodesEnum.OK)
        .json({ msg: 'Editing user by id', id: req.params.userId });
    } catch (e) {
      console.log(e);
    }
  }

};
