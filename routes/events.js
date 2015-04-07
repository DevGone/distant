var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });
var slug = require('../helpers/slug');
var events = require('../data/events');

router.route('/')
  .get(function(request, response) {
    var activeEvent = events.getEvent();
    response.json({
      event: activeEvent
    });
  })
  .post(parseUrlEncoded, function(request, response) {
    var eventId = request.query.event;
    if (!eventId) {
      eventId = request.body.event;
    }
    events.setEventWithId(eventId);
    response.redirect('/events/');
  });

module.exports = router;
