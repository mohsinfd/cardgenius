import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  width: 64px;
  height: 44px;
  margin-right: 0.75rem;
  
  @media (max-width: 768px) {
    width: 48px;
    height: 32px;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Logo = () => {
  return (
    <LogoContainer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
        <defs>
          <linearGradient id="gradientCard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0066FF"/>
            <stop offset="100%" stopColor="#0066FF"/>
          </linearGradient>
        </defs>
        <rect x="40" y="30" width="220" height="140" rx="15" fill="url(#gradientCard)" />
        <rect x="60" y="60" width="40" height="30" rx="5" fill="#fff" opacity="0.8"/>
        <line x1="60" y1="110" x2="260" y2="110" stroke="#fff" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
        <line x1="60" y1="130" x2="260" y2="130" stroke="#fff" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
        <path d="M140 90 L170 120 L240 60" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </LogoContainer>
  );
};

export default Logo; 