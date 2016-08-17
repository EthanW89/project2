const express = require('express');
const router = express.Router();
var request = require('request');
const db = require('../../db/db');

router.get('/getBeer/:query', function (req, res){
  var api = "7534ca16aa6fc5ba3993d037b77dc0a4"
  query = req.params.query
  //console.log(query)
  request(("http://api.brewerydb.com/v2/search?q="+query+"&type=beer&key="+api), function (error, response, body) {
    //console.log(body)
    var parsedBody = JSON.parse(body)
    if (response.statusCode == 200) {
      res.send(parsedBody)
    }
  })
});

router.post('/saveBeer', db.create_beer, function (req, res){
  var beerData = req.body;
  var received = beerData.name && beerData.email && beerData.description ? "received" : "not received";
  console.log(received);

  if (res.error){
    res.send(res.error)
  } else {
    res.send(res.success)
  }

   // var parsedBody = JSON.parse(body)
    // if (response.statusCode == 200) {
    //   res.send(parsedBody)
    // }

});

module.exports = router;
