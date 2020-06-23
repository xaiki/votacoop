const Gun = require('gun/gun');
const SEA = require('gun/sea');


const gun = Gun([
  'http://localhost:8765/gun'
]);

function gasync(...args) {
  return new Promise((accept, reject) => {
    gun.get.apply(this, [...args, accept])
  })
}

module.exports = {
  gun,
  gasync
}
