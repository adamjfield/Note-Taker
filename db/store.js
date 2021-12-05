const util = require('util');
const fs = require('fs');
// const uuidv1 = require('uuid');
const { v4: uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {}

module.exports = new Store();
