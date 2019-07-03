/**
 * webpack.config
 * 
 * @see https://webpack.js.org/guides/getting-started/
 * 
 * @author  Yang,junlong at 2019-07-03 15:30:48 build.
 * @version $Id$
 */

module.exports = {
  entry: './src/mvvm.js',
  output: {
  	filename: 'mvvm.js',
  	library: 'Mvvm',
  	libraryTarget: 'umd'
  }
};