const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: Product
  })
  res.json(tags)
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.id
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
  try {
    const [updatedRows] = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Tag not found or no changes made' });
    }

    res.json({ message: 'Tag updated successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});


// router.put('/:id', async (req, res) => {
//   // update a tag's name by its `id` value
//   const tag = await Tag.update(
//     req.body,
//     {
//       where:{
//         id: req.params.id
//       }

//     }
//   )
//   res.json(tag)
// });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  res.json({
    message: 'Tag deleted succesfully'
  })
});

module.exports = router;
