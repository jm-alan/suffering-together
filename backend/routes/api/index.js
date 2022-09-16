const router = require('express').Router();

const sessionRouter = require('./session');
const usersRouter = require('./users');
const itemsRouter = require('./items');
const housesRouter = require('./houses');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/houses', housesRouter);

module.exports = router;
