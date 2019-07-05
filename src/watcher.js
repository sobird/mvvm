/**
 * Watcher
 *
 * @see https://github.com/vuejs/vue/blob/v2.6.10/src/core/observer/watcher.js
 * 
 * @author  Yang,junlong at 2019-07-03 17:54:44 build.
 * @version $Id$
 */
import Dep, { pushTarget, popTarget } from './dep'

var uid = 0;

export default function Watcher (vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this
  }
  vm._watchers.push(this);

  this.cb = cb;
  this.id = ++uid;
  this.active = true;
  this.deps = [];
  this.newDeps = [];
  this.depIds = new Set();
  this.newDepIds = new Set();

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = this.parsePath(expOrFn.trim());
  }

  this.value = this.get();
}

Watcher.prototype.get = function () {
  pushTarget(this);
  var value = this.getter.call(this.vm, this.vm);
  Dep.target = null;

  this.cleanupDeps();

  return value;
};

Watcher.prototype.addDep = function (dep) {
  const id = dep.id
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

Watcher.prototype.cleanupDeps = function () {
  let i = this.deps.length
  while (i--) {
    const dep = this.deps[i]
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this)
    }
  }
  let tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

Watcher.prototype.update = function () {
  this.run();
};

Watcher.prototype.run = function () {
  if (this.active) {
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
}


function parsePath (path) {
  if (/[^\w.$]/.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj;
  }
}
