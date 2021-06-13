import React from 'react'
import styled from '@emotion/styled'
import { breakpoint, container } from '../utils/styles'

const HeaderTop = styled.div`
    ${container}
    height: 40vh;
    display: grid;
    align-items: end;
    justify-items: start;
    margin-left: 40px;
    background-color: var(--color-white);
`

const HeaderContextLeft = styled.div`
    grid-column: 1 / 6;
    grid-row: 1 / 1;
    margin-bottom: 20px;
`

const HeaderLink = styled.a`
    display: flex;
    align-items: center;
`

const HeaderSvg = styled.svg`
    width: 22px;
    height: 22px;
    fill: var(--color-gray);
    margin-top: 3px;
    margin-left: 5px;
`

const HeaderContextRight = styled.div`
    grid-column: 3 / 6;
    grid-row: 1 / 1;
    margin-bottom: 20px;
`

const H1 = styled.h1`
    margin-top: 10px;
`

const HeaderText = styled.p`
    margin-bottom: 0;
`

const IframeBottom = styled.div`
    position: relative;
`

const IframeOuter = styled.div`
    padding-bottom: 56.25%;
    overflow: hidden;
    height: auto;
`
const IframeWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`
const Iframe = styled.iframe`
    display: block;
    height: 300%;
    left: auto;
    pointer-events: none;
    position: absolute;
    top: -100%;
    transform: scale(1.2);
    transition: opacity .2s ease-in-out;
    width: 100%;
    z-index: 1;
`


const Header = () => {  
    return (
        <>
            <HeaderTop>
                <HeaderContextLeft>
                    <HeaderLink href="">shop now 
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
            <IframeBottom>
                <IframeOuter>
                <IframeWrapper>
                    <Iframe 
                        src="https://www.youtube.com/embed/rMKpKojBxgI?autoplay=1&amp;mute=1&amp;showinfo=0&amp;modestbranding=1&amp;autohide=0&amp;branding=0&amp;cc_load_policy=0&amp;controls=0&amp;fs=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;quality=hd720&amp;rel=0&amp;showinfo=0&amp;wmode=opaque&amp;loop=1" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen="1">
                    </Iframe>
                </IframeWrapper>
                </IframeOuter>
            </IframeBottom>
        </>

    )
  }


export default Header