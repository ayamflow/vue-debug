'use strict';

/**
 * Clean log without getter/setter
 * usefull for in-application debugging.
 * Only log $data & its properties
 *
 * (mostly to avoid JSON parse exception with
 * circular references from vm.$compiler)
 */

module.exports = function(Vue) {
    var utils = Vue.require('utils'),
    isObject = utils.isTrueObject,
    slice = [].slice;

    return function() {
        if(!console) return;
            
        var args = slice.call(arguments);
        
        for(var i = args.length - 1; i >= 0; i--) {
            var arg = args[i];

            // Directly log any primitive arg
            if(!isObject(arg)) continue;

            var hasCircularRef = false,
                isVm = !!arg.$compiler;
            
            // If arg is a vm, log $data directly
            if(isVm) {
                args.splice(i, 1, arg.$data);
                continue;
            }

            // don't log if $ or $compiler
            for(var prop in arg) {
                // $compiler
                if(prop === 'vm') hasCircularRef = true;
                
                // $ / v-ref
                if(isObject(arg[prop]) && '$compiler' in arg[prop]) hasCircularRef = true;
            }

            if(hasCircularRef) {
                args.splice(i, 1);
                continue;
            }
        }
        
        // using `return` makes it testable  
        return console.log.apply(console, JSON.parse(JSON.stringify(args)));
    };
};