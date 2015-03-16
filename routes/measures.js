var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });
var slug = require('../helpers/slug');
var model = require('../data/model');

/* GET schools listing. */
router.route('/')
  .get(function(request, response) {
    response.json(model.getAllMeasures());
  })
  .post(parseUrlEncoded, function(request, response) {
    var measure = request.body;
    console.log(request.body);
    response.json(model.addMeasure(measure));
  })
  .delete(function(request, response) {
    model.clearMeasures();
    response.sendStatus(200);
  });

module.exports = router;
