const jsonfile = require("jsonfile");

const readJSON = (filePath) => {
  return jsonfile.readFileSync(filePath);
};

module.exports = { readJSON };
