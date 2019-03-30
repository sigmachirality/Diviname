'use strict';
const _ = require('seedrandom');

const sentences = [];
const size = 0;

function getNameMeaning(name) {
    Math.seedrandom(name);
    var ret = '';
    for (var i = 0; i < 5; i++) {
        ret = ret + " " + sentences[Math.random() * size];
    }
    return ret;
}