/**
 * rollup.config
 *
 * @see http://rollupjs.org/guide/zh/
 * 
 * @author  Yang,junlong at 2019-07-03 16:28:10 build.
 * @version $Id$
 */

export default {
  input: 'src/mvvm.js',
  output: {
  	file: 'dist/mvvm.js',
  	format: 'umd',
  	name: 'Mvvm'
  }
}
