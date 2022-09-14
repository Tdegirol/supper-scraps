const { response } = require('express');
const fetch = require('cross-fetch');
require('dotenv').config();

const router = require('express').Router();

router
  .route('/')
  .get((req, res) => {
    // TODO: should ingredients be an array to allow for multiple ingredients?
    let ingredients = req.query.q;

    let url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${ingredients}`;

    console.log(url);
    console.log(process.env.API_KEY)
    fetch(url, {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

module.exports = router;