import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  display: ${props => props.$isVisible ? 'block' : 'none'};
  background: linear-gradient(135deg, #ff6b00 0%, #ee0979 100%);
  padding: 4rem 1rem;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Hero = ({ isVisible = true }) => {
  return (
    <HeroContainer $isVisible={isVisible}>
      <HeroContent>
        <Title>Find Your Perfect Credit Card</Title>
        <Subtitle>
          Compare and discover credit cards that match your spending patterns
          and maximize your rewards.
        </Subtitle>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 