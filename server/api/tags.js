const router = require('express').Router();
const {
  models: { Tag },
} = require('../db');

const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const createdTag = await Tag.create({
      imageUrl: req.body.imageUrl,
      userId: req.body.userId,
      title: req.body.title,
    });

    console.log(createdTag);
    res.json(createdTag);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    await tag.destroy();
    res.json(tag);
  } catch (err) {
    next(err);
  }
});
