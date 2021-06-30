const userRouter = require('express').Router();
const {userController} = require('../controller');
const {userMiddleware} = require('../middleware');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.addNewUser);
userRouter.get('/:userId', userMiddleware.checkIsUserExists,userController.getUserById);
userRouter.delete('/:userId', userMiddleware.checkIsUserExists, userController.removeUserById);
userRouter.post('/:userId', userMiddleware.checkIsUserExists, userController.editUserById);


module.exports= userRouter;