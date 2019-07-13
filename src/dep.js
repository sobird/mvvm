/**
 * Dep defined
 *
 * @see https://github.com/vuejs/vue/blob/v2.6.10/src/core/observer/dep.js
 * 
 * @author  Yang,junlong at 2019-07-03 16:57:47 build.
 * @version $Id$
 */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  var index = this.subs.indexOf(sub);
  if (index != -1) {
    this.subs.splice(index, 1);
  }
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;

const targetStack = []

export function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

