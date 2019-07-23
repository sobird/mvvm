/**
 * shared.js
 *
 * @see https://github.com/vuejs/vue/blob/dev/src/shared/util.js
 * 
 * @author  Yang,junlong at 2019-07-23 13:43:36 build.
 * @version $Id$
 */

export const emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
export function isUndef(v) {
  return v === undefined || v === null
}

/**
 * Check if value is primitive.
 */
export function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

/**
 * Check if val is a valid array index.
 */
export function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ?
    function(val) {
      return map[val.toLowerCase()];
    } :
    function(val) {
      return map[val];
    }
}

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
export function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
export function cached(fn) {
  var cache = Object.create(null);
  return (function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
export const camelize = cached(function(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : '';
  })
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached(function(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
export function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ?
      l > 1 ?
      fn.apply(ctx, arguments) :
      fn.call(ctx, a) :
      fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

export function nativeBind(fn, ctx) {
  return fn.bind(ctx)
}

export const bind = Function.prototype.bind ?
  nativeBind :
  polyfillBind;

/**
 * Mix properties into target object.
 */
export function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop(a, b, c) {}

/**
 * Always return false.
 */
export const no = function(a, b, c) {
  return false;
};

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
export const identity = function(_) {
  return _;
};

/**
 * Generate a string containing static keys from compiler modules.
 */
export function genStaticKeys(modules) {
  return modules.reduce(function(keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}