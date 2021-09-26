// react
import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'

// gatsby
import { Link } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"

// components
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import Shower from '../utils/shower';
import { $$ } from '../utils/dom';

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import {container} from '../styles/containers'


// LEGAL

const Legal = styled.div`
  ${container};
  margin-top: 120px;

  @media ${breakpoint.tablet} { 
    margin-top: 100px;
  }
`

// LEGAL TEXT

const LegalText = styled.div`
  margin-top: 50px;
  width: 70%;

  @media ${breakpoint.tablet} { 
    width: 100%;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 30px;
  }

  p {
    margin-top: 10px;
  }

  p strong {
    margin-top: 30px;
    display: block;

    @media ${breakpoint.mobile} { 
      margin-top: 20px;
    }
  }

  ul {
    padding: 0px;
    margin-bottom: 0px;
  }

  .accordion {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .accordion__button {
    display: flex;
    align-items: center;
    position: relative;
    text-align: left;
    padding: 0;
  }

  .accordion__button svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .accordion__button[aria-expanded="true"]::before {
    transform: rotate(180deg);
  }


  .accordion__panel p {
    margin-left: 30px;
  }
`

// LEGAL LINK

const LegalLink = styled(Link)`
  margin-top: 50px;
  display: inline-block;
`

// LEGAL IMAGE

const LegalImage = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    column-gap: 20px;

    @media ${breakpoint.tablet} { 
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media ${breakpoint.mobile} { 
      grid-template-columns: 1fr 1fr;
    }
`



const FaqPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);

  useEffect(() => {
    const accordionButtons = $$('.accordion__button')

   
    if(accordionButtons.length) {
      accordionButtons.forEach(accordionButton => {
        const target = accordionButton.nextElementSibling;
  
          new Shower({
            target: target,
            handler: accordionButton,
            easing: 'ease',
            duration: 350,
            initOpened: true,
            openClassName: 'is-open',
          }).init();
      });
    };
  }, []);

return <Legal>
    <Seo title="FAQ" />
    <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} hasScroll={false} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>

    {/* LEGAL IMAGE */}
    <LegalImage>
      <StaticImage className="image-hover" src="../assets/images/maneki.jpg" alt="maneki neko" />
      <StaticImage className="image-hover" src="../assets/images/sake.jpg" alt="sake" />
    </LegalImage>

    {/* LEGAL TEXT*/}
    <LegalText>

      <p><strong>FAQ</strong></p>

      <div class="accordion">
        <button class="accordion__button">
          <svg viewBox="0 0 57 76" fill="none" class="bonsai">
            <path d="M40.943 76.001H18.059C9.205 76.001 2.001 70.356 2.001 61.501V61.001H57.001V61.501C57.001 70.356 49.797 76.001 40.943 76.001ZM3.009 62.001C3.274 70.074 9.923 75.001 18.059 75.001H40.943C49.079 75.001 55.728 70.074 55.993 62.001H3.009ZM38.686 55.517L43.012 60.001H44.402L39.687 55.114V41.907L31.687 34.128V30.574C31.359 30.438 31.026 30.318 30.687 30.212V34.551L38.687 42.33V55.517H38.686ZM30.686 47.329L18.001 60.001H19.416L31.686 47.743V41.907L23.686 34.128V30.195C23.347 30.299 23.014 30.417 22.686 30.55V34.55L30.686 42.329V47.329ZM41.362 32.481C38.828 32.481 36.48 31.711 34.516 30.407C32.404 28.722 29.73 27.712 26.818 27.712C23.683 27.712 20.823 28.882 18.644 30.806C16.816 31.865 14.699 32.48 12.434 32.48C5.567 32.48 0 26.913 0 20.046C0 13.179 5.567 7.612 12.434 7.612C13.421 7.612 14.38 7.731 15.301 7.948C17.101 3.298 21.612 0 26.897 0C32.182 0 36.694 3.299 38.493 7.948C39.414 7.731 40.373 7.612 41.36 7.612C48.227 7.612 53.793 13.179 53.793 20.046C53.795 26.914 48.228 32.481 41.362 32.481Z" fill="black"/>
          </svg>
          <span>Do you ship to my country?</span>
        </button>
        <div class="accordion__panel">
          <p>We are currently only shipping to Germany</p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion__button">
          <svg viewBox="0 0 67 63" fill="none" class="ceramic">
            <path d="M5.231 13.54L65.025 0L65.822 3.807L5.618 15.389L5.231 13.54ZM6.796 21.017L67 9.435L66.203 5.628L6.409 19.168L6.796 21.017ZM36.786 58.999V62H22.786V59.053L21.786 59.726V63H37.786V59.672L36.786 58.999ZM0 29V29.5C0 43.002 8.187 54.297 20.528 58.162L21.599 57.441C9.403 53.99 1.207 43.114 1.004 30.001H60.194C59.962 42.682 50.952 53.787 38.03 57.426L39.103 58.149C52.191 54.108 61.198 42.573 61.198 29.501V29.001H0V29Z" fill="black"/>
          </svg>
          <span>How much is the shipping cost?</span>
        </button>
        <div class="accordion__panel">
          <p>We provide free shipping.</p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion__button">
          <svg viewBox="0 0 69 71" fill="none" class="daruma">
            <path d="M36.2988 71H32.7008C23.0778 71 13.9888 66.816 7.76381 59.521C1.59381 52.29 -1.08919 42.771 0.404809 33.405L1.09581 29.074C3.78281 12.227 18.1868 0 35.3448 0C51.5248 0 65.1068 11.53 67.6408 27.416L68.5958 33.404C70.0898 42.77 67.4068 52.289 61.2368 59.52C55.0108 66.816 45.9218 71 36.2988 71ZM35.3438 1C18.6798 1 4.69181 12.873 2.08181 29.231L1.39081 33.562C-0.0571897 42.639 2.54281 51.864 8.52381 58.872C14.5588 65.944 23.3708 70 32.6998 70H36.2978C45.6268 70 54.4388 65.944 60.4738 58.872C66.4548 51.864 69.0538 42.639 67.6068 33.562L66.6518 27.574C64.1968 12.176 51.0298 1 35.3438 1ZM28.5668 22.077C27.4618 22.077 26.5668 22.972 26.5668 24.077C26.5668 25.182 27.4618 26.077 28.5668 26.077C29.6718 26.077 30.5668 25.182 30.5668 24.077L28.5668 22.077ZM38.4328 24.077C38.4328 25.182 39.3278 26.077 40.4328 26.077C41.5378 26.077 42.4328 25.182 42.4328 24.077C42.4328 22.972 41.5378 22.077 40.4328 22.077L38.4328 24.077ZM23.4998 47.316H20.4998V57.316H23.4998V47.316ZM31.8328 47.316H28.8328V57.316H31.8328V47.316ZM40.1668 47.316H37.1668V57.316H40.1668V47.316ZM48.4998 47.316H45.4998V57.316H48.4998V47.316ZM43.4998 13.069H41.4998C41.4998 16.378 38.8088 19.069 35.4998 19.069V21.069C39.9108 21.069 43.4998 17.48 43.4998 13.069ZM33.4998 19.069C30.1908 19.069 27.4998 16.378 27.4998 13.069H25.4998C25.4998 17.48 29.0888 21.069 33.4998 21.069V19.069ZM32.4998 29.569V26.569C27.8128 26.569 23.9998 30.382 23.9998 35.069H26.9998C26.9998 32.036 29.4668 29.569 32.4998 29.569ZM36.4998 26.569V29.569C39.5328 29.569 41.9998 32.036 41.9998 35.069H44.9998C44.9998 30.382 41.1868 26.569 36.4998 26.569ZM33.4998 40.108C22.9378 39.7 14.4998 32.933 14.4998 24.647C14.4998 16.361 22.9378 9.594 33.4998 9.186V8.186C22.3858 8.6 13.4998 15.813 13.4998 24.646C13.4998 33.479 22.3858 40.692 33.4998 41.106V40.108ZM35.4998 8.187V9.187C46.0618 9.595 54.4998 16.362 54.4998 24.648C54.4998 32.934 46.0618 39.701 35.4998 40.109V41.109C46.6138 40.695 55.4998 33.482 55.4998 24.649C55.4998 15.816 46.6138 8.601 35.4998 8.187Z" fill="black"/>
          </svg>
          <span>When will I receive my order?</span>
        </button>
        <div class="accordion__panel">
          <p>Within 30 to 60 days.</p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion__button">
          <svg viewBox="0 0 67 70" fill="none" class="kimono">
            <path d="M49 22.518V34.518H18V22.518H49ZM48 36.52V69H19V36.52H18V69.5V70H49V69.5V36.52H48.994H48ZM8.715 37.32C5.613 37.152 3.107 35.772 1.038 33.326L0.999999 1H25.462L31.38 6.918L32.098 6.2L25.898 0H0V33.439C0.012 33.574 0.056999 33.71 0.145999 33.817C2.378 36.536 5.261 38.134 8.661 38.318C11.202 38.46 13.754 37.813 16.004 36.514V35.348C13.805 36.755 11.256 37.464 8.715 37.32ZM40.878 0L40.871 0.00599957L20.404 20.472H21.922L41.394 1H66L65.962 33.327C63.894 35.773 61.387 37.153 58.285 37.321C55.744 37.465 53.195 36.755 50.996 35.35V36.516C53.246 37.815 55.798 38.462 58.339 38.32C61.739 38.136 64.622 36.537 66.854 33.819C66.942 33.712 66.988 33.576 67 33.441V0H40.878Z" fill="black"/>
          </svg>
          <span>My order still has not arrived. What is happening next?</span>
        </button>
        <div class="accordion__panel">
          <p>Just drop us an email to hello@zafu.soy we will check the order status for you.</p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion__button">
        <svg viewBox="0 0 78 73" fill="none" class="origami">
            <path d="M14.788 57.309V72.097L0 57.309H14.788ZM63.212 11.788L78 26.576H63.212V11.788ZM9.155 7.847L20.308 16.662L20.789 15.865L8.533 6.179L3.018 34.986L10.6 55.563H11.585L3.975 34.907L9.155 7.847ZM32.5 1.813L47.288 26.768V42.037V57.095L47.351 72.015H17.775L17.712 57.095V42.037V26.768L32.5 1.813ZM32.5 0L31.705 1.342L16.917 26.297L16.788 26.515V26.768V42.037V57.095V72.076V73H17.712H47.288H48.212V72.076V57.095V42.037V26.768V26.515L48.083 26.297L33.295 1.342L32.5 0ZM61.644 12.992L50.292 24.357V25.773L61.644 14.407V12.992ZM62.14 28.672V56.993L49.94 69.808V71.259L63.14 57.392V28.672H62.14V28.672Z" fill="black"/>
          </svg>
          <span>When will the out of stock items be available again?</span>
        </button>
        <div class="accordion__panel">
          <p>We try to restock items regularly and most items will be available again although some items will not be restocked if they were for limited stock.</p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion__button">
          <svg viewBox="0 0 67 71" fill="none" class="sake">
            <path d="M54.3412 71L66.9982 58H37.4492L50.1072 71H54.3412Z" fill="black"/>
            <path d="M13.829 12.614L2.389 1H29.556L18.208 12.614H19.606L31.931 0H0L12.424 12.614H13.829Z" fill="black"/>
            <path d="M19.0758 14.6133L29.9648 25.6683V62.4323C29.9648 66.1523 27.6858 69.9993 23.8708 69.9993H9.02984C5.39884 69.9993 1.96585 66.3213 1.96585 62.4323V25.6793L13.7358 14.6133H12.2758L0.964844 25.2463V62.4323C0.964844 66.9163 4.80885 70.9993 9.02884 70.9993H23.8708C28.3108 70.9993 30.9648 66.6433 30.9648 62.4323V25.2583L20.4808 14.6133H19.0758Z" fill="black"/>
          </svg>
          <span>Can you send my order to my friend/family?</span>
        </button>
        <div class="accordion__panel">
          <p>Absolutely! You can set a different shipping address to your billing address.</p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion__button">
          <svg viewBox="0 0 75 68" fill="none" class="sushi">
            <path d="M67.6206 19.738L23.5476 12.439L67.6206 19.738ZM67.7016 19.245L23.6286 11.946L23.4656 12.932L67.5386 20.231L67.7016 19.245ZM35.0646 8.649L34.0806 8.475L32.2456 18.867L33.2296 19.041L35.0646 8.649ZM44.4166 10.301L43.4326 10.127L41.5966 20.519L42.5806 20.693L44.4166 10.301ZM52.7296 11.769L51.7456 11.595L49.9106 21.987L50.8946 22.161L52.7296 11.769ZM61.0436 13.238L60.0596 13.064L58.2236 23.456L59.2076 23.63L61.0436 13.238ZM65.4216 8.186L65.4256 8.166L65.2426 8.144C65.1686 8.129 65.0986 8.106 65.0236 8.093C64.4656 7.992 63.9116 7.946 63.3606 7.923L25.7426 3.498L25.2056 3.401C24.6246 3.296 24.0466 3.246 23.4766 3.246C19.9256 3.246 16.6896 5.214 15.0126 8.268L7.54257 0L6.45457 8.297L15.4006 9.764C15.6326 9.156 15.9616 8.536 16.3926 7.927C16.4066 7.908 16.4196 7.888 16.4336 7.869C16.5446 7.715 16.6636 7.562 16.7906 7.41C16.8856 7.294 16.9866 7.183 17.0876 7.072C17.1386 7.017 17.1806 6.96 17.2346 6.905L17.2366 6.911C18.8246 5.258 21.0466 4.245 23.4776 4.245C23.9946 4.245 24.5166 4.292 25.0296 4.385L25.8356 4.515L63.2456 8.916C63.2706 8.919 63.2956 8.921 63.3206 8.922C63.9116 8.947 64.3966 8.996 64.8456 9.077L64.8946 9.089C64.9456 9.102 64.9956 9.114 65.0476 9.125C65.0666 9.129 65.0866 9.132 65.1066 9.135C65.1406 9.146 65.1766 9.156 65.2126 9.164C71.1106 10.433 74.8926 16.074 73.8216 22.005C72.8656 27.303 68.2666 31.148 62.8876 31.148C62.3076 31.148 61.7206 31.102 61.1436 31.011C61.1136 31.006 61.0846 31.003 61.0546 31.001C61.0466 30.999 61.0386 30.998 61.0306 30.997C60.9866 30.99 60.9426 30.984 60.8936 30.98C60.4666 30.903 60.0196 30.788 59.4856 30.618C59.4636 30.611 59.4426 30.605 59.4206 30.6L22.7686 21.623L21.9466 21.458C19.6666 21.047 17.6826 19.772 16.3616 17.868C15.6586 16.856 15.1956 15.729 14.9706 14.554L14.9626 14.559C14.9626 14.559 14.9176 14.334 14.8756 13.985C14.8696 13.939 14.8656 13.892 14.8616 13.846C14.8006 13.277 14.7586 12.458 14.9026 11.709L6.09357 10.264L4.19257 18.369L13.8316 13.408C14.0496 17.801 17.2546 21.628 21.7686 22.442L22.3056 22.539L59.1816 31.571C59.6796 31.729 60.1866 31.869 60.7146 31.964C60.7646 31.973 60.8136 31.975 60.8636 31.983L60.9826 32.012L60.9856 31.998C61.6236 32.099 62.2586 32.147 62.8856 32.147C68.6396 32.147 73.7466 28.044 74.8046 22.181C75.9696 15.727 71.7866 9.556 65.4216 8.186ZM27.8006 27.718L21.4476 53.852L21.4236 53.918V64.205L32.2806 66.361V56.304L39.1796 30.511L27.8006 27.718ZM20.2406 26.042C19.9926 25.098 19.8496 24.119 19.8356 23.123C19.4816 23.009 19.1346 22.879 18.7946 22.733C18.7776 23.789 18.8986 24.829 19.1246 25.838L20.2406 26.042ZM19.4246 54.901V53.919V53.885L11.2386 52.419C4.53757 51.134 -0.0784258 44.168 1.20657 37.466L1.21457 37.429C2.35657 31.475 7.63857 27.107 13.5026 27.107C14.2386 27.107 14.9856 27.176 15.7326 27.319L25.4086 29.09L25.6456 28.117L15.9136 26.336C15.1246 26.185 14.3116 26.107 13.5036 26.107C7.15558 26.107 1.45057 30.893 0.233575 37.24C-0.437425 40.735 0.353574 44.471 2.39657 47.528C4.44857 50.598 7.60257 52.739 11.0506 53.4L19.4246 54.901ZM19.4246 62.818L16.3406 62.227C13.2586 61.636 10.5856 59.817 8.81357 57.106C7.99257 55.85 7.42557 54.48 7.10357 53.062C6.69057 52.845 6.28757 52.61 5.90057 52.354C6.18457 54.229 6.85957 56.044 7.93057 57.683C9.86157 60.636 12.7776 62.618 16.1426 63.263L19.4256 63.893V62.818H19.4246ZM48.7666 64.767C46.1176 66.63 42.9606 67.331 39.8786 66.74L34.2806 65.667V66.363V66.741L39.6796 67.776C40.4606 67.926 41.2446 68 42.0256 68C44.6116 68 47.1566 67.189 49.3736 65.63C51.2246 64.328 52.6796 62.617 53.6576 60.654C53.1976 60.793 52.7326 60.914 52.2576 61.005C51.3816 62.468 50.2076 63.754 48.7666 64.767ZM65.6826 32.956C64.7826 34.701 63.4646 36.22 61.8066 37.386C61.6806 37.475 61.5476 37.548 61.4196 37.631C61.6266 37.917 61.8176 38.214 62.0046 38.514C62.1416 38.425 62.2806 38.342 62.4146 38.248C64.4686 36.803 66.0346 34.855 67.0006 32.616C66.5676 32.75 66.1296 32.864 65.6826 32.956ZM52.1246 32.962L41.1326 30.951L41.1116 31.028L40.8726 31.92L51.9346 33.944C58.6356 35.229 62.9686 42.006 61.6836 48.707L61.6756 48.744C60.5336 54.698 55.2516 59.066 49.3876 59.066C48.6516 59.066 47.9046 58.997 47.1566 58.854L34.2856 56.548L34.2806 56.567V57.563L46.9816 59.838C47.7666 59.989 48.5806 60.066 49.3886 60.066C55.7366 60.066 61.4416 55.28 62.6586 48.933C64.0616 41.622 59.2336 34.325 52.1246 32.962Z" fill="black"/>
          </svg>
          <span>Do you offer a gift-wrapping service?</span>
        </button>
        <div class="accordion__panel">
          <p>No, currently we don't offer a gift-wrapping service.</p>
        </div>
      </div>

    </LegalText>

    {/* LEGAL LINK*/}
    <LegalLink to="/" className="link-hover">
      <span>Take me Back</span>
    </LegalLink>
  </Legal>
}

export default FaqPage