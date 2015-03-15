exports.getSlug = function(string) {
  string = string.toLowerCase(); // To lower case
  return string.split(' ').join('-'); // Replace spaces by dashes
};
