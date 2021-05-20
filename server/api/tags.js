const router = require('express').Router();
const {
  models: { Tag },
} = require('../db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const uploadImage = require('./s3');

const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    console.log(err);
    console.error('error in the getMemes thunk');
    // next(err);
  }
});

router.post('/', upload.single('tag'), async (req, res, next) => {
  try {
    const file = req.file;
    const info = req.body;
    console.log('file ', file, 'info ', info);
    const result = await uploadImage(file);
    console.log('result ', result);

    const createdTag = Tag.create({
      imageUrl: result.Location,
      userId: result.id,
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
