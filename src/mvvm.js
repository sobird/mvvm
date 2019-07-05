/**
 * MVVM入口文件
 *
 * @see https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/init.js
 * 
 * @author  Yang,junlong at 2019-07-03 15:17:38 build.
 * @version $Id$
 */

import Watcher from './watcher';

var uid = 0;

export default function Mvvm (options) {
  if (!new.target) {
  	throw('Mvvm is a constructor and should be called with the `new` keyword');
  }
  var vm = this;
  
  vm._uid = uid++;

  vm.$options = options;

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}


Mvvm.prototype.$watch = function (expOrFn, cb, options) {
  new Watcher(this, expOrFn, cb, options);
};