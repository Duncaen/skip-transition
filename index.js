var raf = require('raf'),
    has = require('has-transitions');

/**
 * Export `skipTransition`
 */
module.exports = skipTransition;

/**
 *
 * @param {Element|Array} el
 * @param {Function} fn
 * @api public
 */
function skipTransition(el, fn) {
  if(!Array.isArray(el)) el = [el];
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
function setTransitionProperty(list, value) {
  if(!Array.isArray(list)) {
    list = [].slice.call(list);
  }
  list.forEach(function(el, idx, arr) {
    if(!el || !has(el)) return;
    el.style.webkitTransitionProperty =
    el.style.mozTransitionProperty =
    el.style.msTransitionProperty =
    el.style.oTransitionProperty = value;
  });
}
