import React, { useState } from 'react';
import styled from 'styled-components';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import SpendingForm from './components/SpendingForm';
import CardResults from './components/CardResults';
import Footer from './components/Footer';
import { getCardRecommendations } from './api/cardsApi';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding-bottom: 4rem;
`;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [cardResults, setCardResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCardResults(null);
    setError(null);
  };

  const handleFormSubmit = async (data) => {
    setFormData({ ...formData, ...data });
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await getCardRecommendations(selectedCategory, data);
      
      if (!results || !results?.data?.cards) {
        throw new Error('Invalid API response format. Expected cards array in response.');
      }
      
      // Check if we have any cards in the results
      if (results.data.cards.length === 0) {
        setError('No credit cards match your spending profile. Try adjusting your spending amounts.');
        setCardResults({ cards: [] });
      } else {
        setCardResults(results.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching card recommendations:', err);
      setError(
        err.response 
          ? `API Error: ${err.response.status} - ${err.response.statusText}`
          : err.message || 'There was an error processing your request. Please try again.'
      );
      setCardResults({ cards: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCardResults(null);
    setSelectedCategory(null);
    setError(null);
  };

  return (
    <AppContainer>
      <MainContent>
        {!selectedCategory ? (
          <>
            <Hero />
            <CategoryList onCategorySelect={handleCategorySelect} />
          </>
        ) : !cardResults ? (
          <SpendingForm
            category={selectedCategory}
            onSubmit={handleFormSubmit}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <CardResults
            cards={cardResults.cards}
            onReset={handleReset}
            isLoading={isLoading}
            error={error}
            category={selectedCategory}
            formData={formData}
          />
        )}
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App; 