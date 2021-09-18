// react
import React from 'react'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import {container} from '../styles/containers'

// components
import aniScroll from '../utils/ani-scroll';


// HEADER

const HeaderComponent = styled.div`
  height: 100vh;
  display: flex;
`

const HeaderTop = styled.div`
  ${container}

  position: relative;
  z-index: 2;
  display: grid;
  align-items: end;
  justify-items: start;
  width: 100%;
  margin-bottom: 60px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media ${breakpoint.tablet} {
    grid-template-columns: 1fr;
  }
`


// HEADER CONTEXT LEFT

const HeaderContextLeft = styled.div`
  grid-column: 1 / 4;
  grid-row: 1 / 1;

  @media ${breakpoint.tablet} {
    grid-column: 1 / 1;
    grid-row: 6 / 6;
  }
`

const HeaderDiscoverButton = styled.button`
  position: absolute;
  transform: rotate(90deg);
  right: 10px;
  bottom: 250px;

  @media ${breakpoint.tablet} {
      right: -30px;
    }

  span {
    color: var(--color-white);
  }
`


//  HEADER CONTEXT RIGHT

const HeaderContextRight = styled.div`
  grid-column: 2 / 4;
  grid-row: 1 / 1;

  @media ${breakpoint.tablet} {
    grid-column: 1 / 1;
    grid-row: 5 / 6;
    margin-bottom: -10px;
  }
`

const HeaderTitle = styled.h1`
  font-family: 'Kobe Regular';
  text-transform: lowercase;
  color: var(--color-white);
  cursor: pointer;
  font-size: 80px;
  line-height: 86px;

  @media ${breakpoint.tablet} {
    font-size: 60px;
    line-height: 67px;
  }
`

const HeaderText = styled.p`
  margin-bottom: 0;
  color: var(--color-white);
  cursor: pointer;
  font-size: 22px;
  line-height: 23px;

  @media ${breakpoint.tablet} {
    font-size: 17px;
    line-height: 18px;
  }
`


/* HEADER IFRAME */

const HeaderIframe = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
    z-index: 1;
  }
`

const HeaderVideo = styled.video`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2);
`


/* HEADER */

const Header = () => {  
    const jumpTo = (hash) => {
        const target = document.querySelector(hash);
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        aniScroll(rect.top + scrollTop, 1000, 'easeInOutQuart');
      };

    return (
        <HeaderComponent>
            <HeaderTop>

                {/* HEADER CONTEXT LEFT */}
                
                <HeaderContextLeft>
                    <HeaderDiscoverButton className="link-hover link-hover--white" onClick={() => jumpTo('#headermarker')}>
                        <span>Discover more</span>
                    </HeaderDiscoverButton>
                </HeaderContextLeft>

                {/* HEADER CONTEXT RIGHT */}

                <HeaderContextRight onClick={() => jumpTo('#headermarker')}>
                    <HeaderText><strong>asian homewares</strong></HeaderText>
                    <HeaderTitle>yayoi</HeaderTitle>
                </HeaderContextRight>
            </HeaderTop>

            {/* HEADER IFRAME */}

            <HeaderIframe>
                <HeaderVideo autoPlay loop muted playsInline preload="none" poster="/images/poster.jpg">
                    <source src="/videos/japan1940.mp4#t=115,275" type="video/mp4" />
                </HeaderVideo>
            </HeaderIframe>
        </HeaderComponent>
    )
  }

export default Header