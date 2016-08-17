const express = require('express');
const router = express.Router();
const db = require('../../db/db');


router.get('/:id', db.get_beer, function (req, res){
  if(res.error){
   req.flash('error', res.error);
  }
});

module.exports = router;
