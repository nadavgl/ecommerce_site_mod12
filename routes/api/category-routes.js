const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories

  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.json(categories)
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {// be sure to include its associated Products
    const iD = await Category.findAll({
      include: [{ Product }]
    })
    response.json(iD)
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const formData = req.body;
    await Category.create(formData)

    res.json({
      message: 'Category created successfully'
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
  //
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category = await Category.update(
    request.body,
    {
      where:{
        id: request.params.category_id
      },
      returning: true,
      plain: true

    })
    res.json(category)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
    where:{
      id: req.params.category_id
    }
  })
  res.json({
    message: 'Category deleted sucessfully'
  })
});

module.exports = router;
