import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const CardLoader = styled.div`
  width: 280px;
  height: 180px;
  background: linear-gradient(135deg, #ff6b00 0%, #ff8533 100%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(255, 107, 0, 0.2);
  animation: ${float} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shine} 2s linear infinite;
  }
`;

const Chip = styled.div`
  width: 40px;
  height: 32px;
  background: linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%);
  border-radius: 6px;
  position: absolute;
  top: 20px;
  left: 20px;
  overflow: hidden;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(0, 0, 0, 0.1) 4px,
      rgba(0, 0, 0, 0.1) 8px
    );
    animation: ${shine} 1.5s linear infinite;
  }
`;

const MagneticStripe = styled.div`
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 20px;
  left: 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shine} 1.5s linear infinite;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: #333;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.5s ease;
  min-height: 1.5em;
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #ff6b00, transparent);
    transform: scaleX(${props => props.isVisible ? 1 : 0});
    transform-origin: left;
    transition: transform 0.5s ease;
  }
`;

const LoadingScreen = ({ onComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadingTexts = [
    "Analyzing your spending patterns...",
    "Calculating potential savings...",
    "Finding the best credit cards for you...",
    "Almost there..."
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    const completionTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <Container>
      <CardLoader>
        <Chip />
        <MagneticStripe />
      </CardLoader>
      <TextContainer>
        {loadingTexts.map((text, index) => (
          <LoadingText 
            key={index}
            isVisible={index <= currentTextIndex}
          >
            {text}
          </LoadingText>
        ))}
      </TextContainer>
    </Container>
  );
};

export default LoadingScreen; 