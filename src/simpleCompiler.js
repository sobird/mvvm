/**
 * 简单的编译类
 * 支持的指令如下：
 * 
 * @author  Yang,junlong at 2019-07-09 16:37:35 build.
 * @version $Id$
 */

import Watcher from './watcher.js';

export default function SimpleCompiler(vm, el) {
  this.$vm = vm;
  this.$el = el;

  this.compile(el);
}

SimpleCompiler.prototype.parse = function (el) {
  var childNodes = el.childNodes;
  var that = this;

  [].slice.call(childNodes).forEach(function(node) {
  	var text = node.textContent;
  	var reg = /\{\{(.*)\}\}/;

  	if (node.nodeType === 1) {
  	  that.compileDirective(node);
  	} else if (node.nodeType === 3 && reg.test(text)) {
  	  directives['text'].bind(that)(node, RegExp.$1.trim(), 'text');
  	}

  	if (node.childNodes && node.childNodes.length) {
  	  that.parse(node);
  	}
  });
};

SimpleCompiler.prototype.compile = function(el) {
  var fragment = document.createDocumentFragment();
  var child;

  while(child = el.firstChild) {
  	fragment.appendChild(child);
  }

  this.parse(fragment);

  this.$fragment = fragment;
};

// 编译指令
SimpleCompiler.prototype.compileDirective = function(node) {
  var attrs = node.attributes;
  var that = this;

  [].slice.call(attrs).forEach(function(attr) {
    var attrName = attr.name;
    if(isBindDirective(attrName)) {
      attrName = 'v-bind' + attrName;
    }

    if(isDirective(attrName)) {
      var exp = attr.value;
      var dir = attrName.substring(2);
      var directive = dir.split(':');
      var dirName = directive[0];
      var dirAttr = directive[1];

      directives[dirName] && directives[dirName].bind(that)(node, exp, dirAttr);
    }
  });
};


SimpleCompiler.prototype.$bind = function (node, exp, dir) {
  var dir = dir || 'text';
  var DOMPatcherFn = DOMPatcher[dir];

  DOMPatcherFn && DOMPatcherFn(node, this._getVMVal(exp));

  new Watcher(this.$vm, exp, function(value, oldValue) {
    DOMPatcherFn && DOMPatcherFn(node, value, oldValue);
  });
}

SimpleCompiler.prototype._getVMVal = function (exp) {
  var val = this.$vm;
  exp = exp.split('.');
  exp.forEach(function(k) {
  	val = val[k];
  });
  return val;
}

SimpleCompiler.prototype._setVMVal = function (exp, value) {
  var val = this.$vm;
  exp = exp.split('.');
  exp.forEach(function(k, i) {
  	// 非最后一个key，更新val的值
  	if (i < exp.length - 1) {
  	  val = val[k];
  	} else {
  	  val[k] = value;
  	}
  });
}

SimpleCompiler.prototype.render = function () {
  return this.$fragment;
}


// 指令集合
var directives = {
  text: function (node, exp) {
  	this.$bind(node, exp, 'text');
  },
  model: function (node, exp) {
    var that = this;
    var val = this._getVMVal(exp);

    node.addEventListener('input', function(e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      that._setVMVal(exp, newValue);
      val = newValue;
    });

    this.$bind(node, exp, 'model');
  },
  html: function(node, exp) {
    this.$bind(node, exp, 'html');
  },
  on: function (node, exp, eventType) {
  	var vm = this.$vm;
  	var eventFn = vm.$options.methods && vm.$options.methods[exp];
  	
  	if (eventType && eventFn) {
      node.addEventListener(eventType, eventFn.bind(vm), false);
    }
  },
  if: function (node, exp) {
    this.$bind(node, exp, 'if');
  }
};

var vifNodeMaps = new Map();

var DOMPatcher = {
  // v-text
  text: function (node, value) {
  	node.textContent = value || '';
  },

  // v-html
  html: function (node, value) {
    node.innerHTML = value || '';
  },

  // v-if
  if: function (node, value) {
    if(value) {
      if(vifNodeMaps.has(node)) {
        var commentNode = vifNodeMaps.get(node);
        commentNode.parentNode.replaceChild(node, commentNode);
      }
    } else {
      var commentNode = document.createComment('');
      node.parentNode.replaceChild(commentNode, node);

      vifNodeMaps.set(node, commentNode);
    }
  },

  // v-model
  model: function (node, value) {
    node.value = value;
  }
};


// 指令
function isDirective (attrName) {
  return attrName.indexOf('v-') === 0;
}
// :title="test"
function isBindDirective (attrName) {
  return attrName.indexOf(':') === 0;
}


function getCommentNode (node, value) {
  var childNodes = node.childNodes;
  var result = null;

  [].slice.call(childNodes).forEach(function(node) {
    if(node.nodeType === 8 && node.nodeValue == value) {
      result = node;
    }
  });

  return result;
}

