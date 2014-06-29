vue-debug
=========

A Vue.js plugin for debug helpers.

## How to use

### 1. Install the plugin.
With npm: `npm i vue-debug --save`

### 2. Mount

```
var vueDebug = require('vue-debug')
Vue.use('vue-debug')
```

If you use component(1), you can directly `Vue.use('vue-debug')`.
Check the [Vue.js documentation about plugins](http://vuejs.org/guide/plugin.html) for more information.


## Helpers list
### `Vue.log()`
Like `console.log` but only logs properties from the `$data` object, without any $get or $set method.
Thus, trying to log the vm itself will only log its `$data`.

If you need to log a VM internal such as `$compiler`, use the regular `console.log`.

#### Example: 

```
var vm = new Vue({
    el: 'body',
    data: {
        foo: 'bar',
        bar: 10
    },
    ready: function() {
        Vue.log(this.foo, this);
        // output: 'bar', Object { foo: 'bar', bar: 10}
    }
});
```

## Contributing
Please feel free to fork and add your own helpers !

## History
v0.0.1 Vue.log method