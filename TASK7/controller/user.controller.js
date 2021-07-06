const { passwordHasher } = require('../services');
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
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      res
        .status(responseCodesEnum.CREATED)
        .json(createdUser);
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
