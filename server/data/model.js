var Slug = require('../helpers/slug');

// Model shape
//
// - Schools [
//     slug : {
//       id : ,
//       slug : ,
//       name : ,
//       city : ,
//       teacherName :,
//       studentGroups : [
//         id : {
//
//         }
//       ],
//       score :
//     },

var DEFAULT_SCORE = 0;

var _idSchool = 0;
var _schools = {
  "berlioz": {
    id: _idSchool++,
    slug: "berlioz",
    name: "Berlioz",
    city: "Lyon",
    teacherName: "Madame Sarthe",
    studentGroups: [
    ],
    score: 100
  }
};

exports.getAllSchools = function() {
  return _schools;
}

exports.getSchool = function(schoolSlug) {
  return _schools[schoolSlug];
};

exports.addSchool = function(name, city, teacherName) {
  if (name && city && teacherName) {

// Create new school
    var school = {
      id: _idSchool++,
      slug: Slug.getSlug(name),
      name: name,
      teacherName : teacherName,
      city: city,
      score: DEFAULT_SCORE,
      studentGroups: []
    };

// Add new school
    _schools[school.slug] = school;

    return school;
  }
  return null;
};
