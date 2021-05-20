const router = require('express').Router();
const {
  models: { Tag },
} = require('../db');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/',
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const uploadImage = require('../s3');

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

router.post('/', upload.single('tag'), async (req, res, next) => {
  try {
    const file = req.file;
    const info = req.body;
    const result = await uploadImage(file);

    const createdTag = Tag.create({
      imageUrl: result.Location,
      userId: Number(result.id),
      title: result.title,
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
