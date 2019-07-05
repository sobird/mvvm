/**
 * util
 * 
 * @author  Yang,junlong at 2019-07-05 15:18:47 build.
 * @version $Id$
 */

export function makeMap (str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0, l = list.length; i < l; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

export var no = function (a, b, c) { 
  return false;
};
