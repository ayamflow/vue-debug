'use strict';

module.exports = function(Vue, options) {
    Vue.log = require('./log')(Vue);
};