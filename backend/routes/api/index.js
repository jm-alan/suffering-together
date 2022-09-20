const router = require('express').Router();

const utilsRouter = require('./utils');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const itemsRouter = require('./items');
const housesRouter = require('./houses');

router.use('/utils', utilsRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/houses', housesRouter);

module.exports = router;
