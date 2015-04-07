var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });
var slug = require('../helpers/slug');
var model = require('../data/model');

/* GET schools listing. */
router.route('/')
  .get(function(request, response) {
    var activity = model.getActivity();
    response.json({
      activity: activity
    });
  })
  .post(parseUrlEncoded, function(request, response) {
    var activity = request.query.activity;
    if (!activity) {
      activity = request.body.activity;
    }
    model.setActivity(activity);
    response.redirect('/activity/');
  });

module.exports = router;
