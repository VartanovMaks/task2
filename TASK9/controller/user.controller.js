const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v1;
const { promisify } = require('util');
const { passwordHasher } = require('../services');
const { responseCodesEnum } = require('../constants');
const { User } = require('../database');

const mkdirPromise = promisify(fs.mkdir);

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
      const { body: { password }, avatar } = req;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await User.create({ ...req.body, password: hashedPassword });
      const { _id } = createdUser;

      if (avatar) {
        const { finalPath, pathAfterStatic } = await _filePathBuilder(avatar.name, _id, 'users', 'photos');
        await avatar.mv(finalPath);
        await User.updateOne({ _id }, { avatar: pathAfterStatic });
      }
      // const normalizedUser = userHelper.userNormalizator(createdUser.toJSON());
      // created user should be changed on normalizeduser
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
async function _filePathBuilder(fileName, itemId, itemType, dirType) {
  const pathWithoutStatic = path.join(itemType, itemId.toString(), dirType);
  const fileFullPath = path.join(process.cwd(), 'static', pathWithoutStatic);

  const fileExtension = fileName.split('.').pop();
  const fileNewName = `${uuid()}.${fileExtension}`;
  const finalPath = path.join(fileFullPath, fileNewName);

  await mkdirPromise(fileFullPath, { recursive: true });

  return {
    finalPath,
    pathAfterStatic: path.join(pathWithoutStatic, fileNewName)
  };
}
