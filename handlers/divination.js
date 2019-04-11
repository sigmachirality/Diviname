const _ = require('seedrandom');

const sentences = [];
const size = 0;

function getNameMeaning(name, gender) {
    Math.seedrandom(name + gender);
    var ret = '';
    for (var i = 0; i < 5; i++) {
        ret = ret + " " + sentences[Math.random() * size];
    }
    return ret;
}

module.exports = {
    getNameMeaning : getNameMeaning
}