const userRouter = require('express').Router();
const userController = require('../controller/user.controller');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.addNewUser);
userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.removeUserById);
userRouter.post('/:userId', userController.editUserById);


module.exports= userRouter;