import React from 'react'
import styled from '@emotion/styled'
import { breakpoint, container } from '../utils/styles'

const HeaderOuter = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const HeaderTop = styled.div`
    ${container}
    position: relative;
    z-index: 1;
    display: grid;
    align-items: end;
    justify-items: start;
    background-color: var(--color-white);
`

const HeaderContextLeft = styled.div`
    grid-column: 1 / 6;
    grid-row: 1 / 1;
    margin-bottom: 20px;

    @media ${breakpoint.tablet} {
        grid-column: 1 / 1;
        grid-row: 4 / 4;
        margin-bottom: 10px;
      }
`

const HeaderLink = styled.a`
    display: flex;
    align-items: center;

    &:hover svg {
        transform: translateX(5px)
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
    grid-column: 3 / 12;
    grid-row: 1 / 1;
    margin-bottom: 20px;

    @media ${breakpoint.tablet} {
        grid-column: 1 / 1;
        grid-row: 3 / 4;
        margin-bottom: 10px;
        margin-top: 95px;
      }
`

const H1 = styled.h1`
    margin-top: 10px;
    letter-spacing: 1px;
`

const HeaderText = styled.p`
    margin-bottom: 0;
`

const IframeWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
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
    return (
        <HeaderOuter>
            <HeaderTop>
                <HeaderContextLeft>
                    <HeaderLink href="#shopnow">shop all 
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
                <Video autoPlay loop muted>
                    <source src="/videos/japan1940.mp4" type="video/mp4" />
                </Video>
            </IframeWrapper>
        </HeaderOuter>

    )
  }


export default Header