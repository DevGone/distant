var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });
var slug = require('../helpers/slug');
var model = require('../data/model');

/* GET schools listing. */
router.route('/')
  .get(function(request, response) {
    response.json(model.getAllSchools());
  })
  .post(parseUrlEncoded, function(request, response) {
    var name = request.query.name;
    var city = request.query.city;
    var teacherName = request.query.teacherName;
    if (!name || !city || !teacherName) {
      name = request.body.name;
      city = request.body.city;
      teacherName = request.body.teacherName;
    }
    var school = model.addSchool(name, city, teacherName);
    if (school) {
      response.redirect('/schools/'+school.slug);
    } else {
      response.sendStatus(400);
    }
  });

router.route('/:slug')
  .get(function(request, response) {
    var schoolSlug = request.params.slug;
    var school = model.getSchool(schoolSlug);
    if (school) {
      response.json(school);
    } else {
      response.status(404).send('School not found');
    }
  });

module.exports = router;
