import React from 'react'
import styled from '@emotion/styled'

const HeaderTop = styled.div`
    height: 40vh
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
            <HeaderTop></HeaderTop>
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