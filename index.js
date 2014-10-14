var raf = require('raf');

/**
 * Export `skipTransition`
 */
module.exports = skipTransition;

/**
 *
 * @param {Element} el
 * @param {Boolean} childs (optional)
 * @param {Function} fn
 * @api public
 */
function skipTransition(el, childs, fn) {
  if(typeof childs === 'function') {
    fn = childs;
    childs = undefined;
  }
  if(childs !== false) {
    el = [].slice.call(el.getElementsByTagName('*'));
  }
  setTransitionProperty(el, 'none');
  raf(
    fn.bind(null, function() {
      console.log('skip done');
      raf(setTransitionProperty.bind(null, el, ''));
    })
  );
}

/**
 *
 *
 */
function setTransitionProperty(el, value) {
  if(Array.isArray(el)) {
    for(var i = 0, len = el.length; i < len; i++) {
      setTransitionProperty(el[i], value);
    }
    return;
  }
  if(!el || !el.style) return;
  el.style.webkitTransitionProperty =
  el.style.mozTransitionProperty =
  el.style.msTransitionProperty =
  el.style.oTransitionProperty = value;
}
