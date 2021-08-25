import React from 'react'
import styled from '@emotion/styled/macro'
import { breakpoint, container } from '../utils/styles'
import aniScroll from '../utils/ani-scroll';

const HeaderOuter = styled.div`
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
    margin-bottom: 40px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media ${breakpoint.tablet} {
        grid-template-columns: 1fr;
    }
`

const HeaderContextLeft = styled.div`
    grid-column: 1 / 4;
    grid-row: 1 / 1;

    @media ${breakpoint.tablet} {
        grid-column: 1 / 1;
        grid-row: 6 / 6;
      }
`

const DiscoverButton = styled.button`
    position: absolute;
    right: 20px;
    bottom: 50px;
    transform: rotate(90deg);
    font-size: 12px;
    border-radius: 20px;
    text-align: center;
    border-radius: 18px;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid var(--color-gray);
    color: var(--color-white);
    font-family: 'IBM Plex Sans';
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${breakpoint.tablet} {
        right: -20px;
        bottom: 200px;
      }

    &:hover {
        border: 1px solid var(--color-white);
    }

    &:hover svg {
        transform: translateX(5px);
        fill: var(--color-white);
    }
`

 const ArrowSvg = styled.svg`
    width: 22px;
    height: 22px;
    fill: var(--color-gray);
    margin-top: 2px;
    margin-left: 5px;
    transition: transform 300ms ease-in-out;

    @media ${breakpoint.tablet} {
        fill: var(--color-white);
      }
`

const HeaderContextRight = styled.div`
    grid-column: 2 / 4;
    grid-row: 1 / 1;

    @media ${breakpoint.tablet} {
        grid-column: 1 / 1;
        grid-row: 5 / 6;
        margin-bottom: -10px;
      }
`

const H1 = styled.h1`
    font-family: 'IBM Plex Sans';
    font-weight: 400;
    margin-top: 10px;
    letter-spacing: 1px;
    color: var(--color-white);
    cursor: pointer;
`

const HeaderText = styled.p`
    margin-bottom: 0;
    color: var(--color-white);
    font-family: 'IBM Plex Sans';
    font-weight: 400;
    cursor: pointer;
`

const IframeWrapper = styled.div`
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
const Video = styled.video`
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.2);
`

const Header = () => {  
    const jumpTo = (hash) => {
        const target = document.querySelector(hash);
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        aniScroll(rect.top + scrollTop, 1000, 'easeInOutQuart');
      };

    return (
        <HeaderOuter>
            <HeaderTop>
                <HeaderContextLeft>
                    <DiscoverButton onClick={() => jumpTo('#shopnow')}><small>Discover more</small>
                        <ArrowSvg x="0px" y="0px" viewBox="0 0 22 10">
                            <polygon points="17,0.65 16.29,1.35 19.44,4.5 0.65,4.5 0.65,5.5 19.44,5.5 16.29,8.65 17,9.35 21.35,5 "></polygon>
                        </ArrowSvg>
                    </DiscoverButton>
                </HeaderContextLeft>
                <HeaderContextRight onClick={() => jumpTo('#shopnow')}>
                    <HeaderText>asian homewares</HeaderText>
                    <H1>yayoi.shop (jaːjoˈi)</H1>
                </HeaderContextRight>
            </HeaderTop>
            <IframeWrapper>
                <Video autoPlay loop muted playsInline preload="none" poster="/images/poster.jpg">
                    <source src="/videos/japan1940.mp4#t=115,275" type="video/mp4" />
                </Video>
            </IframeWrapper>
        </HeaderOuter>

    )
  }

export default Header