var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });

var schools = [];

/* GET schools listing. */
router.route('/')
  .get(function(request, response) {

  })
  .post(parseUrlEncoded, function(request, response) {

  });

router.route('/:slug')
  .all(function(request, response) {

  })
  .get(function(request, response) {

  });

module.exports = router;
