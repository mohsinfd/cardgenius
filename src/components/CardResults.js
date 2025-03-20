import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoadingScreen from './LoadingScreen';

const Container = styled.div`
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-color);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  
  &:hover {
    background-color: var(--light-gray);
  }
`;

const Title = styled.h2`
  margin: 0 auto 0 1rem;
  font-size: 1.6rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const TopCardsSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const TopCardsScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.75rem;
  padding: 0.5rem 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  margin: 0 -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--light-gray);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
  }
`;

const RemainingCardsSection = styled.section``;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background-image: ${props => props.cardBgGradient ? props.cardBgGradient : 'none'};
  background-clip: padding-box;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  opacity: 0;
  transform: translateY(20px);
  animation: ${props => props.isVisible ? 'cardAppear 0.3s forwards' : 'none'};
  animation-delay: ${props => props.animationDelay}ms;
  
  ${props => props.isTopCard && `
    scroll-snap-align: start;
    min-width: 300px;
    max-width: 340px;
  `}
  
  @keyframes cardAppear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const RankLabel = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => {
    switch(props.rank) {
      case 1: return '#FFD700';
      case 2: return '#4CAF50';
      case 3: return '#2196F3';
      default: return '#666';
    }
  }};
  color: ${props => props.rank === 1 ? '#000' : '#FFF'};
  padding: 4px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  margin-bottom: 1rem;
  
  @media (min-width: 480px) {
    width: 280px;
    height: 180px;
    margin-bottom: 0;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  
  /* Fallback for broken images */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    border-radius: 8px;
  }
`;

const JoiningFeeTag = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
`;

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 480px) {
    grid-template-columns: auto 1fr;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const CardName = styled.h4`
  margin: 0;
  font-size: 1.4rem;
  color: #1a1a1a;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CardSavings = styled.div`
  position: relative;
  font-size: 1.6rem;
  font-weight: 700;
  color: #ff6b00;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 107, 0, 0.2),
      transparent
    );
    animation: shimmer 2s infinite linear;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 200%; }
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const BenefitItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1rem;
  line-height: 1.4;
`;

const BenefitHeader = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const BenefitDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.1rem;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.1rem;
  color: #d32f2f;
`;

const BenefitText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CardResults = ({ cards, onReset, isLoading, error, category, formData }) => {
  console.log('CardResults received cards:', cards);
  const [visibleCards, setVisibleCards] = useState([]);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  
  useEffect(() => {
    if (cards && cards.length > 0) {
      console.log('Setting visible cards:', cards);
      setVisibleCards(cards);
    }
  }, [cards]);

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  const getCategoryTitle = (category) => {
    const categoryTitles = {
      'shopping': 'Shopping',
      'travel': 'Travel',
      'dining': 'Dining',
      'grocery': 'Grocery',
      'bills': 'Utility Bills',
      'fuel': 'Fuel',
      'online_food_ordering': 'Online Food Ordering'
    };
    return categoryTitles[category] || category;
  };

  const calculateTotalSpend = (formData) => {
    if (!formData) return 0;
    return Object.values(formData).reduce((sum, value) => sum + (Number(value) || 0), 0);
  };

  if (showLoadingScreen) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (error) {
    return (
      <ErrorMessage>
        <p>{error}</p>
        <button onClick={onReset}>Try Again</button>
      </ErrorMessage>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <NoResultsMessage>
        <p>No credit cards match your spending profile. Try adjusting your spending amounts.</p>
        <button onClick={onReset}>Try Again</button>
      </NoResultsMessage>
    );
  }

  const getTagIdForCategory = (category) => {
    const tagIdMap = {
      'shopping': 2,
      'travel': 12,
      'dining': 6,
      'grocery': 7,
      'bills': 14,
      'fuel': 1,
      'online_food_ordering': 5
    };
    return tagIdMap[category] || 0;
  };

  const renderBenefits = (card) => {
    const tagId = getTagIdForCategory(category);
    const categoryBenefits = card.product_usps
      ?.filter(benefit => benefit.tag_id === tagId)
      ?.sort((a, b) => a.priority - b.priority) || [];

    if (categoryBenefits.length === 0) {
      return (
        <BenefitItem>
          <BenefitText>
            <BenefitHeader>Great all-round benefits</BenefitHeader>
            <BenefitDescription>This card offers solid benefits across multiple categories</BenefitDescription>
          </BenefitText>
        </BenefitItem>
      );
    }

    // Only show the highest priority benefit
    const topBenefit = categoryBenefits[0];
    return (
      <BenefitItem>
        <BenefitText>
          <BenefitHeader>{topBenefit.header}</BenefitHeader>
          <BenefitDescription>{topBenefit.description}</BenefitDescription>
        </BenefitText>
      </BenefitItem>
    );
  };

  const totalSpend = calculateTotalSpend(formData);

  return (
    <Container>
      <Header>
        <BackButton onClick={onReset}>←</BackButton>
        <Title>
          CardGenius Recommendations for your {getCategoryTitle(category)} spends of ₹{totalSpend.toLocaleString()}
        </Title>
      </Header>
      
      <TopCardsSection>
        <SectionTitle>Top Picks</SectionTitle>
        <TopCardsScroll>
          {visibleCards.slice(0, 3).map((card, index) => (
            <CardItem
              key={card.id}
              href={card.network_url}
              target="_blank"
              rel="noopener noreferrer"
              isTopCard
              isVisible={true}
              animationDelay={index * 100}
              rank={index + 1}
              cardBgGradient={card.card_bg_gradient}
            >
              <RankLabel rank={index + 1}>
                {index === 0 ? 'Best Match' : index === 1 ? '#2' : '#3'}
              </RankLabel>
              <CardHeader>
                <CardImageContainer>
                  <CardImage src={card.image} alt={card.name} />
                  <JoiningFeeTag>₹{card.joining_fee_text} Joining Fee</JoiningFeeTag>
                </CardImageContainer>
                <CardInfo>
                  <CardName>{card.name}</CardName>
                  <CardSavings>
                    Your {getCategoryTitle(category)} Savings: ₹{card.annual_saving.toLocaleString()}
                  </CardSavings>
                </CardInfo>
              </CardHeader>
              <BenefitsList>
                {renderBenefits(card)}
              </BenefitsList>
            </CardItem>
          ))}
        </TopCardsScroll>
      </TopCardsSection>

      <RemainingCardsSection>
        <SectionTitle>More Options</SectionTitle>
        <CardsList>
          {visibleCards.slice(3).map((card, index) => (
            <CardItem
              key={card.id}
              href={card.network_url}
              target="_blank"
              rel="noopener noreferrer"
              isVisible={true}
              animationDelay={index * 100}
              rank={index + 1}
              cardBgGradient={card.card_bg_gradient}
            >
              <CardHeader>
                <CardImageContainer>
                  <CardImage src={card.image} alt={card.name} />
                  <JoiningFeeTag>₹{card.joining_fee_text} Joining Fee</JoiningFeeTag>
                </CardImageContainer>
                <CardInfo>
                  <CardName>{card.name}</CardName>
                  <CardSavings>
                    Your {getCategoryTitle(category)} Savings: ₹{card.annual_saving.toLocaleString()}
                  </CardSavings>
                  <BenefitsList>
                    {renderBenefits(card)}
                  </BenefitsList>
                </CardInfo>
              </CardHeader>
            </CardItem>
          ))}
        </CardsList>
      </RemainingCardsSection>
    </Container>
  );
};

export default CardResults; 