import breakpoint from './breakpoints'


// CONTAINER

export const container = `
  padding-left: 150px;
  padding-right: 150px;


  @media ${breakpoint.desktop} { 
    padding-left: 100px;
    padding-right: 100px;
  }

  @media ${breakpoint.tablet} { 
    padding-left: 80px;
    padding-right: 80px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 30px;
    padding-right: 30px;
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