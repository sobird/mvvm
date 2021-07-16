/**
 * Description
 * 
 * @author  Yang,junlong at 2019-07-27 00:38:44 build.
 * @version $Id$
 */

self.addEventListener('message', function (e) {
  console.log(e);

  //self.postMessage('You said: ' + e.data);
}, false);