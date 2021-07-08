const rootRouter = require('express').Router();
const { loginController, logoutController, refreshController } = require('../controller');
const { loginMiddleware, logoutMiddleware, refreshMiddleware } = require('../middleware');

rootRouter.post('/login', loginMiddleware.checkLoginName, loginController.loginUser);
rootRouter.post('/logout', logoutMiddleware.verifyAccessToken, logoutController.logoutUser);
rootRouter.post('/refresh', refreshMiddleware.verifyRefreshToken, refreshController.updateTokenPair);

module.exports = rootRouter;
