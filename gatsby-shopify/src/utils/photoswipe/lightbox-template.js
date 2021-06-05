export default `
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="pswp__bg"></div>
  <div class="pswp__scroll-wrap">
    <div class="pswp__container">
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
    </div>
    <div class="pswp__ui pswp__ui--hidden">
      <div class="pswp__top-bar">
        <button class="pswp__button pswp__button--close" title="Close lightbox (Esc)">
          <span class="sr-only">Close lightbox (Esc)</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="10" 
            height="10" 
            viewBox="0 0 24 24">
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
          </svg>
        </button>
        <button class="pswp__button pswp__button--zoom" title="Zoom image in/out">
          <svg class="icon icon-lupe_vergroessern">
            <use xlink:href="#icon-lupe_vergroessern"></use>
            <symbol id="icon-lupe_vergroessern" viewBox="0 0 28 28">
            <path d="M7.892 6.724c-4.009 3.364-4.531 9.34-1.168 13.349s9.34 4.531 13.349 1.168c4.009-3.364 4.531-9.34 1.168-13.349s-9.34-4.531-13.349-1.168zM9.121 8.189c3.2-2.685 7.97-2.267 10.655 0.932s2.267 7.97-0.932 10.655c-3.2 2.685-7.97 2.267-10.655-0.932s-2.267-7.97 0.932-10.655z"></path>
            <path d="M18.616 13.314v1.383h-9.22v-1.383z"></path>
            <path d="M14.697 9.396v9.22h-1.383v-9.22z"></path>
            <path d="M19.119 19.663l1.441-1.257 5.585 6.405-1.441 1.257z"></path>
            </symbol>
          </svg>
        </button>
        <div class="pswp__preloader">
          <div class="pswp__preloader__icn">
            <div class="pswp__preloader__cut">
              <div class="pswp__preloader__donut"></div>
            </div>
          </div>
        </div>
      </div>
      <button class="pswp__button pswp__button--arrow--left" title="move to next image">
        <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
        <path fill="#000" d="M10.24 486.4c0 2.56 0 2.56 0 0-15.36 15.36-15.36 38.4 0 51.2l325.12 325.12c0 0 0 0 0 0 15.36 15.36 35.84 15.36 51.2 0 12.8-15.36 12.8-35.84 0-51.2l-261.12-261.12h865.28c17.92 0 33.28-15.36 33.28-33.28 0-20.48-15.36-38.4-33.28-38.4h-865.28l261.12-263.68c2.56-2.56 2.56-2.56 5.12-5.12 12.8-15.36 10.24-38.4-5.12-51.2s-38.4-10.24-51.2 5.12l-325.12 322.56z"></path>
        </svg>
      </button>
      <button class="pswp__button pswp__button--arrow--right" title="move to previous image">
        <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
        <path fill="#000" d="M688.64 163.84c-12.8-15.36-35.84-17.92-51.2-5.12s-17.92 35.84-5.12 51.2c2.56 2.56 2.56 2.56 5.12 5.12l261.12 261.12h-862.72c-20.48 0-35.84 17.92-33.28 38.4 0 17.92 15.36 33.28 33.28 33.28h865.28l-263.68 263.68c-12.8 15.36-12.8 35.84 0 51.2 15.36 15.36 35.84 15.36 51.2 0 0 0 0 0 0 0l325.12-325.12c15.36-12.8 15.36-35.84 0-51.2 0 0 0 0 0 0l-325.12-322.56z"></path>
        </svg>
      </button>
      <div class="pswp-container">
          <div class="pswp_imagetitle_text copy">
            <p id="pswp_imagetitle"></p>
          </div>
        </div>
        <div class="pswp__caption">
          <div class="pswp__caption__center">
          </div>
        </div>
      <div class="pswp__counter"></div>
    </div>
  </div>
</div>
`;
