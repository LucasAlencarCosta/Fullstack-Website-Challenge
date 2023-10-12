const path = require("path");

const rootPath = path.resolve(__dirname, "../");
const frontPath = path.join(rootPath, "src/front/");
const keysPath = path.join(rootPath, "keys");

module.exports = {
  rootPath,
  keysPath,
  frontPath,
};
