const router = require('express').Router();
const { Sequelize, ValidationError } = require('sequelize');
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
    const iD = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.json(iD)
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

  try {
    const category = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true

      })
    res.json(category)
  } catch (error) {
    if(error instanceof ValidationError){
      res.status(400).json(error)
      return 
    }
    console.log('error', error)
    res.status(500).json(error)
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({
      message: 'Category deleted sucessfully'
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
})

module.exports = router;
