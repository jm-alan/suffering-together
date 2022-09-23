const router = require('express').Router();
const { Op } = require('sequelize');
const $ = require('express-async-handler');

const { House } = require('../../db/models');
const restoreOrReject = require('../../utils/auth/restoreOrReject');
const limitPermittedKeys = require('../../utils/middleware/limitPermittedKeys');

router.get('/', restoreOrReject, $(async (req, res) => {
  const { user } = req;
  const houses = (await user.getResidences()).indexed('id');
  res.json({ houses });
}));

router.get('/owned', restoreOrReject, $(async (req, res) => {
  const { user } = req;
  const houses = (await user.getOwnedResidences()).indexed('id');
  res.json({ houses });
}));

router.post('/', restoreOrReject, limitPermittedKeys('name', 'joinCode', 'password'), $(async (req, res) => {
  const { user, body } = req;
  const house = await user.createOwnedResidence(body);
  house.addResident(user);
  res.json({ house });
}));

router.get('/:houseID(\\d+)/residents', restoreOrReject, $(async (req, res) => {
  const { user, params: { houseID } } = req;
  const house = (await user.getResidences({ where: { id: +houseID } }))[0];
  if (!house) {
    return res.status(404).json({
      errors: [
        'That residence does not exist'
      ]
    });
  }
  const residents = (await house.getResidents()).indexed('id');
  res.json({ residents });
}));

router.post('/:joinCode/residents', restoreOrReject, limitPermittedKeys('userID'), $(async (req, res) => {
  const { user, params: { joinCode }, body: { password } } = req;
  const house = await House.findOne({ where: { joinCode } });
  if (!house) {
    return res.status(404).json({
      errors: [
        'Sorry, it looks like that join code doesn\'t match any residences',
        'Please double-check and try again, or contact the residence owner.'
      ]
    });
  }
  if (!house.validatePass(password)) {
    return res.status(401).json({
      errors: [
        'Sorry, that password was incorrect.',
        'Please double-check and try again, or contact the residence owner.'
      ]
    });
  }
  await house.addResident(user);
  res.json({ house });
}));

router.delete('/:houseID(\\d+)/residents/:userID(\\d+)', restoreOrReject, $(async (req, res) => {
  const { user, params: { houseID, userID } } = req;
  const house = (await user.getResidences({ where: { id: +houseID } }))[0];
  const userIsOwner = house && await house.hasOwner(user);
  const userIsRemoving = user.id === (+userID);
  if (!house || !(userIsOwner || userIsRemoving)) {
    return res.status(404).json({
      errors: [
        'That residence does not exist'
      ]
    });
  }

  if (userIsOwner && userIsRemoving) {
    const newOwner = (await house.getResidents({
      where: {
        id: {
          [Op.not]: +userID
        }
      }
    }))[0];
    if (!newOwner) {
      await house.destroy();
    } else {
      await house.setOwner(newOwner);
      await house.removeResident(user);
    }
  } else if (userIsOwner) {
    const removingUser = (await house.getResidents({ where: { id: +userID } }))[0];
    if (!removingUser) {
      return res.status(404).json({
        errors: [
          'That user does not exist'
        ]
      });
    }
    await house.removeResident(removingUser);
  } else {
    await house.removeResident(user);
  }
  res.sendStatus(200);
}));

router.delete('/:houseID(\\d+)', restoreOrReject, $(async (req, res) => {
  const { user, params: { houseID } } = req;
  const house = await user.getOwnedResidences({ where: { id: +houseID } });
  if (!house) {
    return res.status(404).json({
      errors: [
        'That residence does not exist'
      ]
    });
  }
  const items = await house.getDebts();
  for (let i = 0; i < items.length; i++) {
    await items[i].destroy();
  }
  const residents = await house.getResidents();
  for (let i = 0; i < residents.length; i++) {
    await house.removeResident(residents[i]);
  }
  await house.destroy();
  res.sendStatus(200);
}));

module.exports = router;
