const router = require('express').Router();
const $ = require('express-async-handler');

const restoreOrReject = require('../../utils/auth/restoreOrReject');
const limitPermittedKeys = require('../../utils/middleware/limitPermittedKeys');

router.get('/credits', restoreOrReject, $(async (req, res) => {
  const { user } = req;
  const credits = (await user.getCredits()).indexed('id');
  res.json({ credits });
}));

router.get('/debts', restoreOrReject, $(async (req, res) => {
  const { user } = req;
  const debts = (await user.getDebts()).indexed('id');
  res.json({ debts });
}));

router.post('/', restoreOrReject, limitPermittedKeys('userIDs', 'houseID', 'amount', 'expense', 'description', 'date'), $(async (req, res) => {
  const { user, body: { userIDs, houseID, amount, expense, description, date } } = req;
  const house = (await user.getResidences({ where: { id: +houseID } }))[0];
  if (!house) {
    return res.status(404).json({
      errors: [
        'No matching residence could be found'
      ]
    });
  }
  const debtors = await house.getResidents({
    where: {
      id: userIDs.map($ => +$)
    }
  });
  if (debtors.length !== userIDs.length) {
    return res.status(400).json({
      errors: [
        'One or more of the provided user IDs is invalid'
      ]
    });
  }
  const item = await user.createItem({
    houseID,
    amount,
    expense,
    description,
    date
  });
  for (let i = 0; i < debtors.length; i++) {
    await item.addDebtor(debtors[i]);
  }
  res.json({ item });
}));

router.get('/:itemID(\\d+)/debtors', restoreOrReject, $(async (req, res) => {
  const { user, params: { itemID } } = req;
  const item = (await user.getCredits({ where: { id: +itemID } }))[0];
  if (!item) {
    return res.status(404).json({
      errors: [
        'That credit/debt item does not exist'
      ]
    });
  }
  const debtors = (await item.getDebtors()).indexed('id');
  res.json({ debtors });
}));

router.get('/:itemID(\\d+)/house', restoreOrReject, $(async (req, res) => {
  const { user, params: { itemID } } = req;
  const item = (await user.getCredits({ where: { id: +itemID } }))[0];
  if (!item) {
    return res.status(404).json({
      errors: [
        'That credit/debt item does not exist'
      ]
    });
  }
  const house = await item.getResidence();
  res.json({ house });
}));

router.patch('/:itemID(\\d+)/house', restoreOrReject, limitPermittedKeys('houseID'), $(async (req, res) => {
  const { user, params: { itemID }, body: { houseID } } = req;
  const item = (await user.getCredits({ where: { id: +itemID } }))[0];
  const house = (await user.getResidences({ where: { id: +houseID } }))[0];
  if (!(item && house)) {
    return res.status(404).json({
      errors: [
        'Either that residence or credit/debt item does not exist'
      ]
    });
  }
  const debtors = await item.getDebtors();
  for (let i = 0; i < debtors.length; i++) {
    item.removeDebtor(debtors[i]);
  }
  await item.setResidence(house);
  res.json({ item });
}));

router.patch('/:itemID(\\d+)/debtors', restoreOrReject, limitPermittedKeys('userIDs'), $(async (req, res) => {
  const { user, params: { itemID }, body: { userIDs } } = req;
  const item = (await user.getCredits({ where: { id: +itemID } }))[0];
  if (!item) {
    return res.status(404).json({
      errors: [
        'That credit/debt item does not exist'
      ]
    });
  }
  const house = item.getResidence();
  const debtors = await house.getResidents({ where: { id: userIDs.map($ => +$) } });
  if (debtors.length !== userIDs.length) {
    return res.status(400).json({
      errors: [
        'One or more of the provided user IDs is invalid'
      ]
    });
  }
  await item.setDebtors(debtors);
  res.sendStatus(200);
}));

module.exports = router;
