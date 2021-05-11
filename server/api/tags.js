const router = require('express').Router();
const {
  models: { Tag },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    next(err);
  }
});
