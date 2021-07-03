const rootRouter = require('express').Router();

rootRouter.get('/', (req, res) => res.json('home page'));
rootRouter.get('/login', (req, res) => res.json('Login page'));
rootRouter.get('/register', (req, res) => res.json('Register page'));

rootRouter.post('/', (req, res) => res.json('post from home page'));
rootRouter.post('/login', (req, res) => res.json('post from Login page'));
rootRouter.post('/register', (req, res) => res.json('post from Register page'));

module.exports = rootRouter;
