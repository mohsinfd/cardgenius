import React from 'react';
import styled from 'styled-components';
import footerIllustration from '../assets/footer-illustration.jpg';

const FooterContainer = styled.footer`
  width: 100%;
  margin-top: 4rem;
`;

const FooterImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterImage 
        src={footerIllustration} 
        alt="CashKaro Footer" 
        loading="lazy"
      />
    </FooterContainer>
  );
};

export default Footer; 