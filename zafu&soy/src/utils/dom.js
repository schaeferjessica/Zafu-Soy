// Returns a node.
export const $ = (selector, root = document) => root.querySelector(selector);

// Returns an array of nodes.
export const $$ = (selector, root = document) => [
  ...root.querySelectorAll(selector),
];

// Matches selector compatible to older browsers (i.e. IE9+).
// https://developer.mozilla.org/de/docs/Web/API/Element/matches
export const matches = (el, selector) =>
  (
    el.matches ||
    el.matchesSelector ||
    el.msMatchesSelector ||
    el.webkitMatchesSelector
  ).call(el, selector);

// Find the closest element by selector.
export const closest = (element, selector, checkSelf = true) => {
  let parent = checkSelf ? element : element.parentNode;

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode;
  }
  return false;
};

// Adds multiple event listeners at once.
export const addListener = (el = window, listeners, func, capture = false) => {
  listeners
    .split(' ')
    .forEach(listener => el.addEventListener(listener, func, capture));
};

// Removes multiple event listener at once.
export const removeListener = (el = window, listeners, func, capture) => {
  listeners
    .split(' ')
    .forEach(listener => el.removeEventListener(listener, func, capture));
};

// Adds multiple styles at once.
export const addStyles = (el = document, styles = {}, prefixes = []) => {
  const prefixedStyles = styles;
  Object.entries(styles).forEach(([prop, value]) => {
    prefixes.forEach(prefix => {
      const ucProp = prop.charAt(0).toUpperCase() + prop.slice(1);
      prefixedStyles[`${prefix}${ucProp}`] = value;
    });
  });
  return Object.assign(el.style, prefixedStyles);
};

// Adds multiple attributes at once.
export const setAttributes = (el, options) => {
  Object.keys(options).forEach(attr => {
    el.setAttribute(attr, options[attr]);
  });
};

// Shorter version for native insertBefore method.
export const insertNodeBefore = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode);
};

// Workaround for missing insertAfter method.
export const insertNodeAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

/**
 * Useful method to parse text as HTML.
 *
 * Possible values for position in comparison to jQuery:
 * 'beforebegin' - $().before
 * 'afterbegin'  - $().prepend
 * 'beforeend'   - $().append
 * 'afterend'    - $().insertAfter
 */
export const insertHTML = (node, position, htmlString) => {
  node.insertAdjacentHTML(position, htmlString);
};

/**
 * Prevents firing multiple times when multiple prefixed events are applied.
 * i.e. el.addEventListener('webkitTransitionEnd transitionend')
 *
 * Usage:
 * const TRANSITIONEND = whichTransitionEvent();
 */
export const whichTransitionEvent = () => {
  if (typeof document === 'undefined') {
    return;
  }
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};

/**
 * Prevents firing multiple times when multiple prefixed events are applied.
 * i.e. el.addEventListener('webkitAnimationEnd animationend')
 *
 * Usage:
 * const ANIMATIONEND = whichAnimationEvent();
 */
export const whichAnimationEvent = () => {
  if (typeof document === 'undefined') {
    return;
  }
  const el = document.createElement('fakeelement');
  const animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (const t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
};

// Get an elements top position relative to the viewport.
export const getTopPosition = node => {
  const rect = node.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

// Get next Sibling who matches the selector (equivalent to jQuery´s next())
export const getNextSibling = (target, selector) => {
  // Get the next sibling element
  let sibling = target.nextElementSibling;

  /*
   * If the sibling matches our selector, return it
   * else, jump to the next sibling and continue the loop
   */
  while (sibling) {
    if (matches(sibling, selector)) {
      return sibling;
    } else if (!sibling || sibling !== null) {
      return;
    }

    sibling = target.nextElementSibling;
  }
};

// Get previous Sibling who matches the selector (equivalent to jQuery´s prev())
export const getPrevSibling = (target, selector) => {
  // Get the previous sibling element
  let sibling = target.previousElementSibling;

  /*
   * If the sibling matches our selector, return it
   * else, jump to the previous sibling and continue the loop
   */
  while (sibling) {
    if (matches(sibling, selector)) {
      return sibling;
    } else if (!sibling || sibling !== null) {
      return;
    }

    sibling = target.previousElementSibling;
  }
};

export const remove = el => el.parentNode.removeChild(el);
