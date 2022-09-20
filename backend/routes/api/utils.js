const router = require('express').Router();
const $ = require('express-async-handler');

const restoreOrReject = require('../../utils/auth/restoreOrReject');

router.get('/random', restoreOrReject, $(async (req, res) => {
  const { query: { name } } = req;
  const code = (name + String.random.lettersAndNumbers(5)).toUpperCase();
  res.json({ code });
}));

module.exports = router;
