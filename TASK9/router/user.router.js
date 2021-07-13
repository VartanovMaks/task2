const userRouter = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware, userJoiMiddleware } = require('../middleware');
const { fileMiddleware } = require('../middleware');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/',
  fileMiddleware.checkFilesData,
  fileMiddleware.checkAvatar,
  userJoiMiddleware.checkUserValidity,
  userMiddleware.checkUserNameExists,
  userMiddleware.checkUserEmailUniq,
  // mailMiddleware.register,
  userController.addNewUser);
userRouter.get('/:userId', userMiddleware.checkUserIdExists, userController.getUserById);
userRouter.delete('/:userId', userMiddleware.checkUserIdExists, userController.removeUserById);
userRouter.put('/:userId',
  userMiddleware.checkUserIdExists,
  userMiddleware.checkUserNameExists,
  userMiddleware.checkUserEmailUniq,
  userController.editUserById);

module.exports = userRouter;
