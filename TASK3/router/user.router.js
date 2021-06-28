const userRouter = require('express').Router();
const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.addNewUser);
userRouter.get('/:userId', userMiddleware.checkIsUserExists,userController.getUserById);
userRouter.delete('/:userId', userController.removeUserById);
userRouter.post('/:userId', 
                userMiddleware.checkIsUserExists, 
                userMiddleware,checkDuplicateId,
                userController.editUserById);


module.exports= userRouter;