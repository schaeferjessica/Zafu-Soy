import breakpoint from './breakpoints'


// CONTAINER

export const container = `
  padding-left: 90px;
  padding-right: 90px;


  @media ${breakpoint.desktop} { 
    padding-left: 70px;
    padding-right: 70px;
  }

  @media ${breakpoint.tablet} { 
    padding-left: 30px;
    padding-right: 30px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 20px;
    padding-right: 20px;
  }
`;

// MODULE SPACE

export const moduleSpace = `
  margin-top: 110px;


  @media ${breakpoint.tablet} { 
    margin-top: 90px;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 60px;
  }
`;

export const moduleSpaceSmall = `
  margin-top: 80px;

  @media ${breakpoint.tablet} { 
    margin-top: 60px;
  }
`

// HEADER SPACE

export const headerSpace = `
  margin-bottom: 20px;

  @media ${breakpoint.mobile} { 
    margin-bottom: 10px;
  }
`;