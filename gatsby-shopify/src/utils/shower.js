import { whichTransitionEvent } from './dom';

const transitionEndEvent = whichTransitionEvent();

const EASINGS = {
  // Cubic
  easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

  // Circ
  easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',

  // Expo
  easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',

  // Quad
  easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
  easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

  // Quart
  easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

  // Quint
  easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
  easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

  // Sine
  easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

  // Back
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
};

// options
// target: [DOM element]
// handler:  [DOM element]
// easing: [String]
// duration: [Number]
// initOpened: [Boolean]
// openClassName: [String]
// closeInstances: [Array] of Show instances which should close if one opens
// cb: [Fn(direction)]

export default class Shower {
  constructor(options) {
    this.el = options.target;
    this.handler = options.handler;
    this.openClassName = options.openClassName;
    this.height = this.measureHeight();
    this.initOpened = options.initOpened;
    this.show = this.initOpened || false;
    this.duration = options.duration || 1000;
    this.easing = EASINGS[options.easing] || options.easing || 'ease-out';
    this.toggleStart =
      typeof options.toggleStart === 'function' ? options.toggleStart : null;
    this.toggleEnd =
      typeof options.toggleEnd === 'function' ? options.toggleEnd : null;
    this._closeInstances = [];
    this.isAnimating = false;
    this.preventAllClose = options.preventAllClose || false;
  }

  set closeInstances(instances) {
    this._closeInstances = instances;
  }

  measureHeight = () => {
    const height = this.el.scrollHeight;
    if (this.height !== height) {
      return height;
    }
    return this.height;
  };

  onTransitionEnd = () => {
    if (this.show) {
      this.el.style.height = 'auto';
      this.el.setAttribute('aria-hidden', 'false');
      this.toggleEnd && this.toggleEnd(this.el, 'show', this.show);
    } else {
      this.el.style.display = 'none';
      this.el.setAttribute('aria-hidden', 'true');
      this.toggleEnd && this.toggleEnd(this.el, 'hide', this.show);
    }
    this.isAnimating = false;
  };

  setProps = () => {
    if (this.show) {
      this.handler.setAttribute('aria-expanded', 'true');
      if (this.openClassName) {
        this.el.classList.add(this.openClassName);
        this.handler.classList.add(this.openClassName);
      }
    } else {
      this.handler.setAttribute('aria-expanded', 'false');
      if (this.openClassName) {
        this.el.classList.remove(this.openClassName);
        this.handler.classList.remove(this.openClassName);
      }
    }
  };

  preventLastClose = () => {
    // prevent last open accordion from closing
    const status = this.handler.getAttribute('aria-expanded');

    return status === 'true';
  };

  setOpenParameters = () => {
    this.el.style.display = 'block';
    this.height = this.measureHeight();
    /* eslint-disable-next-line no-unused-expressions */
    this.el.offsetHeight; // forces repaint
    this.el.style.height = `${this.height}px`;
    this.show = true;
    this.setProps();

    this.toggleStart && this.toggleStart(this.el, 'show', this.show);
  };

  open = () => {
    if (this.isAnimating) return;
    this.isAnimating = true;

    if (this._closeInstances.length) {
      this._closeInstances.forEach(o => {
        if (o) o.show && o.close();
      });

      setTimeout(() => this.setOpenParameters(), this.duration);
    } else {
      this.setOpenParameters();
    }
  };

  close = () => {
    if (this.isAnimating) return;
    this.isAnimating = true;
    // Set to actual height before transitioning to 0
    this.height = this.measureHeight();
    this.el.style.height = `${this.height}px`;
    this.height = 0;
    /* eslint-disable-next-line no-unused-expressions */
    this.el.offsetHeight; // forces repaint
    this.el.style.height = `${this.height}px`;
    this.show = false;
    this.setProps();

    this.toggleStart && this.toggleStart(this.el, 'hide', this.show);
  };

  toggle = e => {
    e.preventDefault();

    const preventClosing = this.preventAllClose && this.preventLastClose();
    if (!preventClosing) {
      this.show ? this.close() : this.open();
    }
  };

  destroy = () => {
    this.handler.classList.remove(this.openClassName);
    this.handler.setAttribute('aria-expanded', 'false');
    this.el.removeAttribute('style');
    this.el.setAttribute('aria-hidden', 'true');
    this.el.classList.remove(this.openClassName);

    const handlerHTML = this.handler.outerHTML;
    const elHTML = this.el.outerHTML;
    this.handler.outerHTML = handlerHTML;
    this.el.outerHTML = elHTML;
  };

  init = () => {
    if (!this.el || !this.handler) {
      console.error(
        `Pass valid elements to shower class. Handler is ${
          this.handler ? `#${this.handler.id}` : this.handler
        }, body is ${this.el ? `#${this.el.id}` : this.el}`
      );
      return;
    }
    this.setProps();
    if (!this.initOpened) {
      this.el.style.display = 'none';
      this.el.style.height = '0';
    }
    this.el.style.overflow = 'hidden';
    this.el.style.transition = `height ${this.duration}ms ${this.easing}`;
    this.el.addEventListener(transitionEndEvent, this.onTransitionEnd, false);
    this.handler.addEventListener('click', this.toggle.bind(this));
  };
}

// NOTE:
// Make sure that slidable elements have overflow set to hidden
// and initially closed ones a height set to 0px via CSS

export function slideOpen(
  el,
  duration = 400,
  easing = 'ease-in-out',
  direction = 'vertical'
) {
  return new Promise(resolve => {
    const axis = direction === 'vertical' ? 'height' : 'width';
    el.style.display = 'block';
    const prevValue = el.style[axis];
    el.style[axis] = 'auto';
    const endValue = getComputedStyle(el)[axis];
    el.style[axis] = prevValue;
    /* eslint-disable-next-line no-unused-expressions */
    el.offsetHeight; // force repaint
    el.style.transition = `${axis} ${duration}ms ${easing}`;
    el.style[axis] = endValue;
    el.addEventListener(
      transitionEndEvent,
      function transitionEnd(event) {
        if (event.propertyName === axis) {
          el.removeEventListener(transitionEndEvent, transitionEnd, false);
          el.style.transition = '';
          el.style[axis] = 'auto';
          resolve();
        }
      },
      false
    );
  });
}

export function slideClose(
  el,
  duration = 400,
  easing = 'ease-in-out',
  direction = 'vertical'
) {
  return new Promise(resolve => {
    const axis = direction === 'vertical' ? 'height' : 'width';
    el.style[axis] = getComputedStyle(el)[axis];
    el.style.transition = `${axis} ${duration}ms ${easing}`;
    /* eslint-disable-next-line no-unused-expressions */
    el.offsetHeight; // force repaint
    el.style[axis] = '0px';
    el.addEventListener(
      transitionEndEvent,
      function transitionEnd(event) {
        if (event.propertyName === axis) {
          el.removeEventListener(transitionEndEvent, transitionEnd, false);
          el.style.transition = '';
          el.style.display = 'none';
          resolve();
        }
      },
      false
    );
  });
}
