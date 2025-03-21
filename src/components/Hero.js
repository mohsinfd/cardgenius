import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const HeroContainer = styled.div`
  display: ${props => props.$isVisible ? 'block' : 'none'};
  background: #1a75ff;
  padding: 4rem 2rem;
  color: white;
  text-align: left;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextContent = styled.div`
  max-width: 600px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 360px;
  height: 220px;

  @media (max-width: 768px) {
    width: 280px;
    height: 180px;
    margin-top: 2rem;
  }
`;

const Card = styled.div`
  position: absolute;
  width: 280px;
  height: 170px;
  background: #0066FF;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: ${floatAnimation} 3s ease-in-out infinite;
  transform-origin: center center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 30px;
    background: #ffd700;
    border-radius: 4px;
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 40px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: white;
    opacity: 0.3;
    box-shadow: 0 20px 0 white;
  }

  &:nth-child(1) {
    background: #ff6b00;
    z-index: 3;
  }

  &:nth-child(2) {
    top: 20px;
    left: 20px;
    background: #ee0979;
    animation-delay: -1.5s;
    z-index: 2;
  }

  &:nth-child(3) {
    top: 40px;
    left: 40px;
    background: #0066FF;
    animation-delay: -0.75s;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 132px;

    &::before {
      width: 32px;
      height: 24px;
      top: 16px;
      left: 16px;
    }

    &::after {
      bottom: 32px;
      left: 16px;
      right: 16px;
    }
  }
`;

const Hero = ({ isVisible = true }) => {
  return (
    <HeroContainer $isVisible={isVisible}>
      <HeroContent>
        <TextContent>
          <Title>Discover the perfect card for your every need</Title>
          <Subtitle>
            Compare and find the best credit cards tailored to your spending habits
          </Subtitle>
        </TextContent>
        <CardContainer>
          <Card />
          <Card />
          <Card />
        </CardContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 