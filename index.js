var raf = require('raf');

/**
 * Export `skipTransition`
 */
module.exports = skipTransition;

/**
 *
 * @param {Element} el
 * @param {Function} fn(callback)
 * @param {Object} thisArg
 * @api public
 */
function skipTransition(el, fn, thisArg) {
  skipTransition.setTransitionProperty(el, 'none');
  raf(
    fn.bind(thisArg, function() {
      raf(skipTransition.setTransitionProperty.bind(null, el, ''));
    })
  );
}

/**
 *
 *
 */
skipTransition.setTransitionProperty = function(el, value) {
  if(!el || !el.style) return;
  el.style.webkitTransitionProperty =
  el.style.mozTransitionProperty =
  el.style.msTransitionProperty =
  el.style.oTransitionProperty = value;
};
