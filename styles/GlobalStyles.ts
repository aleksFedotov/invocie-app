import styled, { createGlobalStyle } from 'styled-components';

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  desktop_m: customMediaQuery(1200),
  tablet: customMediaQuery(850),
  tablet_s: customMediaQuery(750),
  phone: customMediaQuery(700),
  phone_s: customMediaQuery(500),
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Spartan-Medium';
    src: url('/fonts/Spartan-Medium.ttf') format('truetype');
    font-style: medium;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Spartan-Bold';
    src: url('/fonts/Spartan-Bold.ttf') format('truetype');
    font-style: bold;
    font-weight: 700;
    font-display: swap;
  }

:root {

    /* Primary */
  
  --color-main-bg-light:#F8F8FB;
  --color-main-bg-dark:#141625;

  --color-second-bg-ligth:#FFFFFF;
  --color-second-bg-dark:#1E2139;

  --color-main-text-light:#0C0E16;
  --color--main-text-dark:#FFFFFF;

  --color-second-text-light:#7E88C3;
  --color-second-text-dark:#FFFFFF;

  --color-tertiary-text-light:#888EB0;
  --color-tertiary-text-dark:#DFE3FA;
  
  --color-quaternary-text-light:#7E88C3;
  --color-quaternary-text-dark:#DFE3FA;

  --color-total-text-mobile-light:#7E88C3;
  --color-total-text-mobile-dark:#888EB0;

  --color-main-button: #7C5DFA;
  --color-main-button-hover: #9277FF;

  --color-delete-button:#EC5757;
  --color-delete-button-hover:#FF9797;

  --color-edit-button-ligth:#FEF9F9;
  --color-edit-button-ligth-hover:#DFE3FA;

  --color-edit-button-dark:#252945;
  --color-edit-button-dark-hover:#FFFFFF;

  --color-status-paid-bg:rgba(51, 214, 159,0.05);
  --color-status-paid-text:#33D69F;

  --color-status-pending-bg:rgba(255, 143, 0,0.05);
  --color-status-pending-text:#FF8F00;

  --color-status-draft-bg-light:rgba(55, 59, 83,0.05);
  --color-status-draft-text-light:#373B53;

  --color-status-draft-bg-dark:rgba(223, 227, 250,0.05);
  --color-status-draft-text-dark:#FFFFFF;

  --color-bill-footer-light:#373B53;
  --color-bill-footer-dark:#0C0E16;

  --color-bill-editor-bg-light:#FFFFFF;
  --color-bill-editor-bg-dark:#141625;

  --color-add-btn-light:#F9FAFE;
  --color-add-btn-light-hover:#DFE3FA;

  --color-add-btn-dark:#252945;
  --color-add-btn-dark-hover:#DFE3FA;
 
  --color-save-btn-light:#373B53;
  --color-save-btn-light-hover:#0C0E16;

  --color-save-btn-dark:#373B53;
  --color-save-btn-dark-hover:#1E2139;

  --color-checkbox-bg-light: #DFE3FA;
  --color-checkbox-bg-dark: #1E2139;



  
  --colot-discard-btn:#F9FAFE;
  --color-ebony: #252945;
  --color-mirage: #1E2139;
  --color-ship-cove: #7E88C3;
  --color-white:#FFFFFF;
  --color-error:#EC5757;
  --color-purple:#7C5DFA;
  --color-light-purple:#888EB0;

  
/*  Font sizes*/
  --font-size-heading-l: 32px;
  --font-size-heading-m: 20px;
  --font-size-heading-s: 16px;
  --font-size-heading-xs: 12px;
 
  --font-size-body-m: 12px;
  --font-size-body-s: 11px;

  /*  Font line height*/

  --font-line-heading-l:36px;
  --font-line-heading-m:22px;
  --font-line-heading-s:24px;
  --font-line-heading-xs:15px;

  --font-line-body-m:15px;
  --font-line-body-s:18px;

  /*  Font letter spacing*/

  --font-letter-spacing-heading-l:-1px;
  --font-letter-spacing-heading-m:-0.63px;
  --font-letter-spacing-heading-s:-0.8px;
  --font-letter-spacing-heading-xs:-0.25px;

  --font-letter-spacing-body-m:-0.25px;
  --font-letter-spacing-body-s:-0.23px;

}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-size: var(--font-size-body-m);
  line-height: var(--font-line-body-m);
  letter-spacing: var(--font-letter-spacing-body-m);
  font-family: 'Spartan-Medium';
  background-color: ${({ theme }) => theme.mainBg};
  color: ${({ theme }) => theme.mainText};
  min-height: 100Vh;
  transition: background .3s;
  
  
 
/* 
  &::-webkit-scrollbar-track {
  background: var(-color-semi-dark-blue);       
}
&::-webkit-scrollbar-thumb {
  background-color: var(--color-red);   
  border-radius: 20px;      
   
}

&::-webkit-scrollbar {
  width: 12px;             
} */
}



a {
  text-decoration:none;
}

p.body_s {
  font-size: var(--font-size-body-s);
  line-height: var(--font-line-body-s);
  letter-spacing: var(--font-letter-spacing-body-s);

}

h1,h2,h3,h4{
  font-family: 'Spartan-Bold';
  font-weight: 700;
  color:${({ theme }) => theme.mainText};
}

h1 {
  font-size: var(--font-size-heading-l);
  line-height: var(--font-line-heading-l);
  letter-spacing: var(--font-letter-spacing-heading-l);
}
h2 {
  font-size: var(--font-size-heading-m);
  line-height: var(--font-line-heading-m);
  letter-spacing: var(--font-letter-spacing-heading-m);
}
h3 {
  font-size: var(--font-size-heading-s);
  line-height: var(--font-line-heading-s);
  letter-spacing: var(--font-letter-spacing-heading-s);
}
h4 {
  font-size: var(--font-size-heading-xs);
  line-height: var(--font-line-heading-xs);
  letter-spacing: var(--font-letter-spacing-heading-xs);
}
`;

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  ${media.tablet} {
    flex-direction: column;
  }
`;

export const MainWrapper = styled.main`
  margin: 0 auto;
  padding: 3.2rem 2.4rem 2.4rem;
  max-width: 73rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
