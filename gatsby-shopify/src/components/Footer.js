import React from 'react'
import { Link as LinkTo } from 'gatsby'
import styled from '@emotion/styled'
import '../../static/fonts.css';
import { breakpoint, container, moduleSpaceSmall } from '~/utils/styles'

const FooterComponent = styled.footer`
  background-color: var(--color-blue);
  color: var(--color-white);
  margin-top: 100px;


`

const FooterInner = styled.footer`
  ${container}
  ${moduleSpaceSmall}
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;

  @media ${breakpoint.mobile} { 
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  p {
    font-size: 15px;

    @media ${breakpoint.mobile} { 
      font-size: 14px;
    }
  }

  p strong {
    padding-bottom: 5px;
    display: block;
    font-family: IBM Plex Serif;
    color: var(--color-white);
  }
`

const FooterLinksLeft = styled.div`
  display: flex;
`

const FooterLinksRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  @media ${breakpoint.mobile} { 
    margin-top: 40px;
  }
`

const Small  = styled.small`
  margin-top: 30px;
  color: var(--color-gray);
`

const LinkExternSmall  = styled.a`
  font-size: 16px;
  margin-top: 5px;
  color: var(--color-gray);

  &:hover {
    color: var(--color-white);
  }

  @media ${breakpoint.mobile} { 
    font-size: 15px;
  }
`

const LinkExtern  = styled.a`
  font-size: 15px;
  margin-top: 5px;
  color: var(--color-white);

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`

const Link = styled(LinkTo)`
  font-size: 15px;
  margin-top: 5px;
  color: var(--color-white);

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`

const Div = styled.div`
display: flex;
flex-direction: column;

&:not(:first-of-type) {
  margin-left: 100px;

  @media ${breakpoint.desktop} { 
    margin-left: 80px;
  }

  @media ${breakpoint.tablet} { 
    margin-left: 40px;
  }
}
`
// const UlCurrency = styled.ul`
//   padding: 0px;
//   margin: 0px;

//   &.is-hidden {
//     display: none;
//   }
// `
// const LiCurrency = styled.li`
//   margin: 0px;
//   padding: 0px;
//   list-style: none;
//   color: white;
// `
// const ButtonCurrency = styled.button`
//   color: var(--color-white);
//   font-size: 15px;
//   padding: 0px;
//   margin-top: 5px;
//   margin-left: 20px;

//   @media ${breakpoint.mobile} { 
//     font-size: 14px;
//   }
// `
// const ButtonCurrent = styled.button`
//   padding: 0px;
//   margin-top: 5px;
//   margin-left: 20px;
//   color: var(--color-white);
//   font-size: 15px;
//   display: block;
//   position: relative;

//   &::before {
//     content: "↓";
//     position: absolute;
//     left: -20px;
//   }
// `

const Footer = () => {
  // const [currencyVisible, setCurrencyVisible] = useState(false);
  // const [activeCurrency, setActiveCurrency] = useState({
  //   currency: 'EUR €',
  //   value: 'EUR',
  //  });
  // const toggleCurrencyList = () => setCurrencyVisible(!currencyVisible);
  // const currencies = [
  //  {
  //   currency: 'EUR €',
  //   value: 'EUR',
  //  },
  //  {
  //   currency: 'GBP £',
  //   value: 'GBP',
  //  },
  //  {
  //   currency: 'DKK kr.',
  //   value: 'DKK',
  //  },
  //  {
  //   currency: 'HUF Ft',
  //   value: 'HUF',
  //  },
  //  {
  //   currency: 'NOK kr',
  //   value: 'NOK',
  //  },
  //  {
  //   currency: 'CHF',
  //   value: 'CHF',
  //  }
  // ];

    return (
    <FooterComponent>
        <FooterInner>
            <FooterLinksLeft>
                <Div>
                <p><strong>Social</strong></p>
                <Link to="/about/">about</Link>
                <Link to="/faq/">FAQ</Link>
                <LinkExtern href="https://www.instagram.com/maneki.space/" target="_blank" rel="noopener">Instagram</LinkExtern>
                <LinkExtern href="https://www.facebook.com/maneki.space" target="_blank" rel="noopener">Facebook</LinkExtern>
                </Div>
                <Div>
                <p><strong>Orders & Support</strong></p>
                <Link to="/shipping/">Shipping & Returns</Link>
                <Link to="/impressum/">Impressum</Link>
                <Link to="/terms/">Terms</Link>
                <Link to="/privacy/">Privacy</Link>
                </Div>
            </FooterLinksLeft>
            <FooterLinksRight>
                <Div>
                  <p><strong>Contact us:</strong></p>
                  <Link to="/about/">how can we help? </Link>
                </Div>
                {/* <ButtonCurrent value={activeCurrency.value} onClick={() => toggleCurrencyList()}>{activeCurrency.currency}</ButtonCurrent>
                <UlCurrency className={currencyVisible ? 'is-active' : 'is-hidden'}>
                  {currencies.filter(currency => currency.value !== activeCurrency.value).map(currency => <LiCurrency key={currency.value}>
                      <ButtonCurrency value={currency.value} onClick={() => setActiveCurrency({
    currency: currency.currency,
    value: currency.value,
   })}>{currency.currency}</ButtonCurrency>
                  </LiCurrency>)}
                </UlCurrency> */}
                <Small>&#169; {new Date().getFullYear()}, built by{` `} 
                <LinkExternSmall href="https://jessica.gatsbyjs.io/" target="_blank" rel="noreferrer">Jessica Schäfer</LinkExternSmall>
                </Small>
            </FooterLinksRight>
        </FooterInner>
    </FooterComponent>
    )
}

export default Footer
