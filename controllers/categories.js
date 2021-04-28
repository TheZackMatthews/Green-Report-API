'use strict';
const confirmedReport = require('../models/confirmedReport');

async function getCategories(req, res) {
  res.status(200).json(
    [{
      categoryName: 'Beauty Product',
      categoryImage: 'https://17fdu42etp8l3lqlpj43gnlr-wpengine.netdna-ssl.com/wp-content/uploads/2017/01/clean-beauty-products-612x408.jpg'
    },
    {
      categoryName: 'Cleaning Product',
      categoryImage: 'https://followgreenliving.com/wp-content/uploads/2014/04/Green-cleaning-supplies.gif'
    },
    {
      categoryName: 'Clothing',
      categoryImage: 'https://www.nextstepdv.org/wp-content/uploads/2021/03/next-step-ministries-clothes-rack-shopping-donate-1024x678.jpeg'
    },
    {
      categoryName: 'Food And Drink',
      categoryImage: 'https://photosfine.files.wordpress.com/2012/04/food-white-background-4.jpg'
    },
    {
      categoryName: 'Health Product',
      categoryImage: 'https://image.freepik.com/free-photo/medical-antiseptic-hygiene-products-masks_166116-221.jpg'
    }]
  );
}

async function getSingleCategory(req, res) {
  const categoryName = req.params.categoryName.replace(/-/g, ' ');
  console.log(categoryName);
  // Make a findAll call where productCategory = categoryName
  try {
    await confirmedReport.findAll({
      where: {
        productCategory:categoryName
      }
    })
    .then(results => { res.status(200).json(results) });

  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
}

module.exports = {
  getCategories,
  getSingleCategory
};
