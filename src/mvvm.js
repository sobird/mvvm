/**
 * MVVM入口文件
 *
 * @see https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/init.js
 * 
 * @author  Yang,junlong at 2019-07-03 15:17:38 build.
 * @version $Id$
 */

import Watcher from './watcher';
import { observe } from './observer';
import SimpleCompiler from './simpleCompiler';

var uid = 0;

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: function noop(a, b, c) {},
  set: function noop(a, b, c) {}
};

export default function Mvvm (options) {
  if (!new.target) {
  	throw('Mvvm is a constructor and should be called with the `new` keyword');
  }
  var vm = this;
  
  vm._uid = uid++;
  vm._watchers = [];

  vm.$options = options;

  if(options.data) {
    vm.initData();
  }

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

/**
 *
 * @see https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L112
 * 
 * @return {[type]} [description]
 */
Mvvm.prototype.initData = function () {
  var vm = this;
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}

  var keys = Object.keys(data);
  let i = keys.length;

  while (i--) {
    var key = keys[i];

    // 是否vm保留属性
    if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }

  observe(data, true);
}

// Mvvm.prototype._update = function (vnode, hydrating) {
//   var vm = this;
//   var prevEl = vm.$el;
//   var prevVnode = vm._vnode;

//   vm._vnode = vnode;
// };

Mvvm.prototype.$mount = function (el, hydrating) {
  el = el.nodeType == 1 ? el : document.querySelector(el);

  var compiler = new SimpleCompiler(this, el);

  el.appendChild(compiler.render());
};


Mvvm.prototype.$watch = function (expOrFn, cb, options) {
  new Watcher(this, expOrFn, cb, options);
};

// 将data属性代理到vm对象
function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key];
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    
    return {}
  } finally {
    
  }
}


function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
