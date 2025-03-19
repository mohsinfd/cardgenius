import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  background: linear-gradient(135deg, #0066FF 0%, #5C9DFF 100%);
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isVisible ? 1 : 0};
  max-height: ${props => props.isVisible ? '1000px' : '0'};
  transition: opacity 0.3s ease, max-height 0.3s ease;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const TextContent = styled.div`
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.75rem;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
    margin: 0 0 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  z-index: 1;
  min-height: 180px;
  
  &::before {
    content: '';
    position: absolute;
    width: 140%;
    height: 140%;
    background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
    z-index: -1;
    animation: pulse 3s ease-in-out infinite;
  }

  @media (min-width: 768px) {
    padding: 2rem;
    min-height: auto;
  }
`;

const Card = styled.div`
  width: 180px;
  height: 113px;
  background: linear-gradient(135deg, #FF6B00 0%, #FF8533 100%);
  border-radius: 12px;
  position: absolute;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  will-change: transform;
  transform-origin: center center;

  &:first-child {
    background: linear-gradient(135deg, #FF6B00 0%, #FF8533 100%);
    animation: floatFirst 4s ease-in-out infinite;
    z-index: 2;
  }

  &:last-child {
    background: linear-gradient(135deg, #0066FF 0%, #5C9DFF 100%);
    animation: floatSecond 4s ease-in-out infinite;
    z-index: 1;
  }

  @media (min-width: 768px) {
    width: 340px;
    height: 213px;
    border-radius: 16px;
  }

  @keyframes floatFirst {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(-5deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @keyframes floatSecond {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(5deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`;

const CardChip = styled.div`
  position: absolute;
  width: 32px;
  height: 24px;
  background: #FFD700;
  border-radius: 4px;
  top: 40px;
  left: 24px;
  opacity: 0.8;

  @media (min-width: 768px) {
    width: 48px;
    height: 36px;
    top: 60px;
    left: 40px;
  }
`;

const CardLogo = styled.div`
  position: absolute;
  width: 40px;
  height: 24px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  bottom: 16px;
  right: 16px;

  @media (min-width: 768px) {
    width: 60px;
    height: 36px;
    bottom: 30px;
    right: 30px;
  }
`;

const Hero = ({ isVisible = true }) => {
  return (
    <HeroContainer isVisible={isVisible}>
      <HeroContent>
        <TextContent>
          <Title>Discover the perfect card for your every need</Title>
          <Subtitle>Compare and find the best credit cards tailored to your spending habits</Subtitle>
        </TextContent>
        <ImageContainer>
          <Card>
            <CardChip />
            <CardLogo />
          </Card>
          <Card>
            <CardChip />
            <CardLogo />
          </Card>
        </ImageContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 