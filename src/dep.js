/**
 * Dep defined
 *
 * @see https://github.com/vuejs/vue/blob/v2.6.10/src/core/observer/dep.js
 * 
 * @author  Yang,junlong at 2019-07-03 16:57:47 build.
 * @version $Id$
 */

var uid = 0

export default function Dep () {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function (sub) {
  var index = this.subs.indexOf(sub);
  if (index != -1) {
    this.subs.splice(index, 1);
  }
};

Dep.prototype.depend = function () {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
};

Dep.prototype.notify = function() {
  this.subs.forEach(function(sub) {
    sub.update();
  });
};

Dep.target = null;
const targetStack = [];

export function pushTarget (target) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
