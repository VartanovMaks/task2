const rootRouter = require('express').Router();
const { loginController, logoutController, refreshController } = require('../controller');
const {
  loginMiddleware, logoutMiddleware, refreshMiddleware, passwordMiddleware, userMiddleware
} = require('../middleware');

rootRouter.post('/login',
  loginMiddleware.checkLoginName,
  passwordMiddleware.passwordCompare,
  loginController.loginUser);
rootRouter.post('/logout',
  logoutMiddleware.verifyAccessToken,
  userMiddleware.findUserById,
  logoutController.logoutUser);
rootRouter.post('/refresh', refreshMiddleware.verifyRefreshToken, refreshController.updateTokenPair);

module.exports = rootRouter;
