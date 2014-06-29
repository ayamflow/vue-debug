var Vue = require('vue'),
    vueDebug = require('../src/index.js');

describe('log', function () {
    
    // Mock console.log method
    console.log = function() {
        var args = [].slice.call(arguments);
        return args;
    };

    // Install plugin
    Vue.use(vueDebug);

    var foo = {
        bar: Math.random() * 1000
    };

    it('should not fail when called without arguments', function (done) {
        Vue.log();
        done();
    });

    it('should log my object', function () {
        var simpleFoo = Vue.log(foo)[0];
        assert.strictEqual(simpleFoo.bar, foo.bar);
    });
});