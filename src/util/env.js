/**
 * env.js
 *
 * @see https://github.com/vuejs/vue/blob/dev/src/core/util/env.js
 * 
 * @author  Yang,junlong at 2019-07-23 13:31:11 build.
 * @version $Id$
 */

export const hasProto = '__proto__' in {};

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined';
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
export const isPhantomJS = UA && /phantomjs/.test(UA);
export const isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch;

export const supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
export const _isServer;
export const isServerRendering = function() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
