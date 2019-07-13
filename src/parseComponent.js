/**
 * Parse a single-file component (*.vue) file into an SFC Descriptor Object.
 *
 * @see https://github.com/vuejs/vue/blob/v2.6.10/src/sfc/parser.js
 * 
 * @author  Yang,junlong at 2019-07-05 02:01:06 build.
 * @version $Id$
 */
import { parseHTML } from './parseHTML';
import { makeMap } from './util';

var splitRE = /\r?\n/g;
var replaceRE = /./g;
var isSpecialTag = makeMap('script,style,template', true);

export function parseComponent (content, options) {
  if ( options === void 0 ) {
  	options = {};
  }

  var sfc = {
  	template: null,
  	script: null,
  	styles: [],
  	customBlocks: [],
  	errors: []
  };

  var depth = 0;
  var currentBlock = null;

  var warn = msg => { sfc.errors.push(msg) };

  function start (tag, attrs, unary, start, end) {
  	if ( depth === 0) {
  	  currentBlock = {
  	  	type: tag,
  	  	content: '',
  	  	start: end,
  	  	attrs: attrs.reduce((cumulated, { name, value }) => {
  	  	  cumulated[name] = value || true;
          return cumulated;
  	  	}, {})
  	  };

  	  if (isSpecialTag(tag)) {
        checkAttrs(currentBlock, attrs)
        if (tag === 'style') {
          sfc.styles.push(currentBlock)
        } else {
          sfc[tag] = currentBlock
        }
      } else { // custom blocks
        sfc.customBlocks.push(currentBlock)
      }
  	}
  	if (!unary) {
      depth++;
    }
  }

  function checkAttrs (block, attrs) {
  	for (var i = 0; i < attrs.length; i++) {
  	  var attr = attrs[i];
  	  if (attr.name === 'lang') {
  	  	block.lang = attr.name;
  	  }
  	  if ( attr.name === 'scoped') {
  	  	block.scoped = true;
  	  }
  	  if (attr.name === 'module') {
  	  	block.module = attr.value || true;
  	  }
  	  if (attr.name === 'src') {
  	  	block.src = attr.value;
  	  }
  	}
  }

  function end (tag, start) {
    if (depth === 1 && currentBlock) {
      currentBlock.end = start;
      var text = content.slice(currentBlock.start, currentBlock.end);
      
      // pad content so that linters and pre-processors can output correct
      // line numbers in errors and warnings
      if (currentBlock.type !== 'template' && options.pad) {
        text = padContent(currentBlock, options.pad) + text
      }
      currentBlock.content = text
      currentBlock = null
    }
    depth--;
  }

  function padContent (block, pad) {
    if (pad === 'space') {
      return content.slice(0, block.start).replace(replaceRE, ' ')
    } else {
      var offset = content.slice(0, block.start).split(splitRE).length;
      var padChar = block.type === 'script' && !block.lang
        ? '//\n'
        : '\n';
      return Array(offset).join(padChar)
    }
  }

  parseHTML(content, {
    warn,
    start,
    end,
    outputSourceRange: options.outputSourceRange
  })

  return sfc;
}

// var fs = require('fs');
// var html = fs.readFileSync('../sfc.vue', 'utf8');
// var result = parseComponent(html, {});

// console.log(result);
