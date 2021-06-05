import { $, $$, closest, remove, insertHTML } from '../dom';
import TEMPLATE from './lightbox-template';
import './Lightbox.css';

export default class Lightbox {
  TEMPLATE_SELECTOR = '.pswp';

  constructor(container, config) {
    this.container = container;
    this.selector = config.selector;

    this.templateIsAdded = this.isTemplateAdded();
    this.template = this.templateIsAdded
      ? $(this.TEMPLATE_SELECTOR)
      : new DOMParser().parseFromString(TEMPLATE, 'text/html').body.firstChild;
    !this.templateIsAdded && document.body.appendChild(this.template);

    this.options = {
      timeToIdle: 40000,
      timeToIdleOutside: 40000,
      loadingIndicatorDelay: 1000,
      index: 0,
      bgOpacity: 0.95,
      showHideOpacity: true,
      history: false,
      closeOnScroll: false,
    };
    this.items = $$(this.selector, this.container);
    this.slides = this.getSlides(this.items);
    this.pswp = null;
    this.cb = config.cb;
  }

  handleCallbacks = () => {
    this.cb && this.cb(this.pswp);
  };

  isTemplateAdded = () => $(this.TEMPLATE_SELECTOR);

  getSlides = items => {
    return items.map(item => {
      const dataset = item.dataset;
      const {
        src,
        size,
        title,
        iframe,
        figcaption,
        copyright,
        copyrightUrl,
      } = dataset;

      if (iframe) {
        const html = `<div class="pswp__iframe"><div class="pswp__iframe-wrap">${iframe}</div>`;
        return { html, title: '', imageTitle: title };
      } else if (size) {
        const sizes = size.split('x');
        const w = parseInt(sizes[0], 10);
        const h = parseInt(sizes[1], 10);
        return {
          src,
          w,
          h,
          title: `${figcaption}${copyright &&
            `</br><span class="copyright">${
              copyrightUrl
                ? `<a href="${copyrightUrl}">${copyright}</a>`
                : copyright
            }</span>`}`,
          imageTitle: title,
        };
      }
    });
  };

  bindEvents = () => {
    if (this.items.length) {
      this.items.forEach(item => item.addEventListener('click', this.open));
    }
  };

  getIndex = slide => {
    switch (typeof slide) {
      case 'number':
        return slide;
      case 'object':
        return this.items.indexOf(closest(slide.target, this.selector));
      default:
        return null;
    }
  };

  setImageTitle = item => {
    document.getElementById('pswp_imagetitle').textContent = item.imageTitle;
  };

  resetIframe = item => {
    const currentHTML = item && item.html;
    const iframes = $$('.pswp__iframe iframe');

    /*
     * reset iframes on slide/close, except for the active on.
     * Because pswp won´t stop playing videos/audios.
     * */
    if (iframes.length) {
      iframes.forEach(iframe => {
        const src = iframe.src;
        if (currentHTML) {
          const currentIframeSrc = currentHTML
            .split('src="')
            .pop()
            .split('"')[0];

          // compare src from iframe to detect if it´s the active one
          if (currentIframeSrc !== src) this.cloneIframe(iframe);
        } else {
          this.cloneIframe(iframe);
        }
      });
    }
  };

  cloneIframe = iframe => {
    const clone = document.createElement('iframe');

    iframe.attributes.forEach(attr => {
      clone.setAttribute(attr.name, attr.value);
    });

    insertHTML(iframe, 'afterend', clone.outerHTML);
    remove(iframe);
  };

  // `slide` could be an event or an index
  open = slide => {
    const { template, slides, options } = this;
    // Opens selected slide
    options.index = this.getIndex(slide);

    if (options.index !== -1) {
      return Promise.all([
        import(/* webpackChunkName: 'photoswipe' */ 'photoswipe'),
        import(
          /* webpackChunkName: 'PhotoSwipeUI' */ 'photoswipe/dist/photoswipe-ui-default'
        ),
      ]).then(([ps, psui]) => {
        const PhotoSwipe = ps.default;
        const PhotoSwipeUI = psui.default;

        this.pswp = new PhotoSwipe(template, PhotoSwipeUI, slides, options);

        this.pswp.init();
        this.setImageTitle(this.pswp.currItem);

        $(this.selector, this.container).classList.add('is-active');

        this.pswp.listen('afterChange', () => {
          this.setImageTitle(this.pswp.currItem);
          this.resetIframe(this.pswp.currItem);
          this.handleCallbacks();
        });

        this.pswp.listen('close', () => {
          $(this.selector, this.container).classList.remove('is-active');
          this.resetIframe();
        });
      });
    } else {
      return Promise.resolve();
    }
  };

  init = () => {
    this.bindEvents();
  };
}
