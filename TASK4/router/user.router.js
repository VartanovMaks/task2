const userRouter = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddleware.checkUserNameExists, userController.addNewUser);
userRouter.get('/:userId', userMiddleware.checkUserIdExists, userController.getUserById);
userRouter.delete('/:userId', userMiddleware.checkUserIdExists, userController.removeUserById);
userRouter.post('/:userId', userMiddleware.checkUserIdExists, userController.editUserById);

module.exports = userRouter;
