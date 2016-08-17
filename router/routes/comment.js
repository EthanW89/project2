const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.post('/save', db.create_comment, function (req, res){
  if (res.error){
    res.send(res.error)
  } else {
    res.send(res.success)
  }

});

module.exports = router;
