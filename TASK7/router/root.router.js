const rootRouter = require('express').Router();
const { loginController } = require('../controller');

rootRouter.get('/', (req, res) => res.json('home page'));
rootRouter.get('/login', (req, res) => res.json('Login page'));
rootRouter.get('/register', (req, res) => res.json('Register page'));

rootRouter.post('/', (req, res) => res.json('post from home page'));
rootRouter.post('/login', loginController.loginUser);
rootRouter.post('/register', (req, res) => res.json('post from Register page'));

module.exports = rootRouter;
