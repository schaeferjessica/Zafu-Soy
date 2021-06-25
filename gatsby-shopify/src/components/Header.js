import React from 'react'
import styled from '@emotion/styled'
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
        grid-row: 4 / 4;
        margin-bottom: 100px;
      }
`

const HeaderLink = styled.button`
    display: flex;
    align-items: center;
    color: var(--color-white);
    font-family: 'IBM Plex Sans';
    font-weight: 500;

    &:hover svg {
        transform: translateX(5px);
        fill: var(--color-white);
    }
`

const HeaderSvg = styled.svg`
    width: 22px;
    height: 22px;
    fill: var(--color-gray);
    margin-top: 3px;
    margin-left: 5px;
    transition: transform 300ms ease-in-out;
`

const HeaderContextRight = styled.div`
    grid-column: 2 / 4;
    grid-row: 1 / 1;

    @media ${breakpoint.tablet} {
        grid-column: 1 / 1;
        grid-row: 3 / 4;
        margin-bottom: 0px;
        margin-top: 95px;
        margin-left: 0px;
      }
`

const H1 = styled.h1`
    font-family: 'IBM Plex Sans';
    font-weight: 400;
    margin-top: 10px;
    letter-spacing: 1px;
    color: var(--color-white);
`

const HeaderText = styled.p`
    margin-bottom: 0;
    color: var(--color-white);
    font-family: 'IBM Plex Sans';
    font-weight: 400;
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
                    <HeaderLink onClick={() => jumpTo('#shopnow')}>shop all 
                    <HeaderSvg x="0px" y="0px" viewBox="0 0 22 10">
                        <polygon points="17,0.65 16.29,1.35 19.44,4.5 0.65,4.5 0.65,5.5 19.44,5.5 16.29,8.65 17,9.35 21.35,5 "></polygon>
                    </HeaderSvg>
                    </HeaderLink>
                </HeaderContextLeft>
                <HeaderContextRight>
                    <HeaderText>japanese homewares</HeaderText>
                    <H1>Maneki 招き猫 Space</H1>
                </HeaderContextRight>
            </HeaderTop>
            <IframeWrapper>
                <Video autoPlay loop muted playsInline>
                    <source src="/videos/japan1940.mp4#t=108,275" type="video/mp4" />
                </Video>
            </IframeWrapper>
        </HeaderOuter>

    )
  }


export default Header