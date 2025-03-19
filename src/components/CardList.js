import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1.5rem;
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
  margin: 0;
  font-size: 1.6rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardName = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
  color: #333;
`;

const CardDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  margin-top: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const CardList = ({ cards, onBack, isLoading, error }) => {
  if (isLoading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={onBack}>
            ← Back
          </BackButton>
          <Title>Recommended Cards</Title>
        </Header>
        <LoadingMessage>Loading recommended cards...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton onClick={onBack}>
            ← Back
          </BackButton>
          <Title>Recommended Cards</Title>
        </Header>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <Container>
        <Header>
          <BackButton onClick={onBack}>
            ← Back
          </BackButton>
          <Title>Recommended Cards</Title>
        </Header>
        <ErrorMessage>No cards found matching your criteria.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>
          ← Back
        </BackButton>
        <Title>Recommended Cards</Title>
      </Header>
      <CardGrid>
        {cards.map((card, index) => (
          <Card key={index}>
            <CardName>{card.name}</CardName>
            <CardDetails>
              <DetailRow>
                <span>Annual Fee:</span>
                <span>{card.annualFee}</span>
              </DetailRow>
              <DetailRow>
                <span>Rewards Rate:</span>
                <span>{card.rewardsRate}</span>
              </DetailRow>
              <DetailRow>
                <span>Welcome Bonus:</span>
                <span>{card.welcomeBonus}</span>
              </DetailRow>
              <DetailRow>
                <span>Estimated Savings:</span>
                <span>{card.estimatedSavings}</span>
              </DetailRow>
            </CardDetails>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default CardList; 