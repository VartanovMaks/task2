const { responseCodesEnum } = require('../constants');
const { User } = require('../database');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      res
        .status(responseCodesEnum.OK)
        .json(users);
    } catch (e) {
      next(e);
    }
  },
  addNewUser: async (req, res, next) => {
    try {
      if (!req.userExists) {
        await User.create(req.body);
        res
          .status(responseCodesEnum.CREATED)
          .json(req.body);
      } else {
        res.json(`Name ${req.body.name} already in base`);
      }
    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      res
        .status(responseCodesEnum.OK)
        .json(user);
    } catch (e) {
      next(e);
    }
  },
  removeUserById: async (req, res, next) => {
    try {
      await User.findByIdAndRemove(req.params.userId);
      res
        .status(responseCodesEnum.OK)
        .json({ msg: 'remove user by id', id: req.params.userId });
    } catch (e) {
      next(e);
    }
  },
  editUserById: async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, req.body);
      res
        .status(responseCodesEnum.OK)
        .json({ msg: 'Editing user by id', id: req.params.userId });
    } catch (e) {
      next(e);
    }
  }

};
