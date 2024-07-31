const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: Product
  })
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.tag_id
  const tag = await Tag.findByPk(id, {
    include: Product
  })
  res.json(tag)
});

router.post('/', async (req, res) => {
  // create a new tag
  const formData = req.body;
  const tag = await Tag.create(formData)

  res.json({
    message:'Tag created succesfully!',

  })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.update(
    req.body,
    {
      where:{
        id: req.params.tag_id
      },
      returning: true,
      plain: true
    }
  )
  res.json(tag)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where:{
      id: req.params.tag_id
    }
  })
  res.json({
    message: 'Tag deleted succesfully'
  })
});

module.exports = router;
