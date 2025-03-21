import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryList from './components/CategoryList';
import SpendingForm from './components/SpendingForm';
import CardResults from './components/CardResults';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Hero from './components/Hero';
import { isAuthenticated, setAuthToken, removeAuthToken } from './utils/auth';
import { getCardRecommendations } from './api/cardsApi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 60px;
`;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsAuthenticatedUser(authStatus);
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFormData({});
    setCards([]);
    setError(null);
  };

  const handleFormSubmit = async (data) => {
    setFormData(data);
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await getCardRecommendations(selectedCategory, data);
      
      if (!results || !results?.data?.cards) {
        throw new Error('Invalid API response format. Expected cards array in response.');
      }
      
      if (results.data.cards.length === 0) {
        setError('No credit cards match your spending profile. Try adjusting your spending amounts.');
        setCards([]);
      } else {
        setCards(results.data.cards);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching card recommendations:', err);
      setError(
        err.response 
          ? `API Error: ${err.response.status} - ${err.response.statusText}`
          : err.message || 'There was an error processing your request. Please try again.'
      );
      setCards([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setFormData({});
    setCards([]);
    setError(null);
  };

  const handleResultsBack = () => {
    setCards([]);
    setError(null);
  };

  const handleAuthClick = () => {
    if (isAuthenticatedUser) {
      removeAuthToken();
      setIsAuthenticatedUser(false);
    } else {
      setShowSignUp(true);
    }
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    setIsAuthenticatedUser(true);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Router>
      <AppContainer>
        <Header onAuthClick={handleAuthClick} isAuthenticated={isAuthenticatedUser} />
        <MainContent>
          <Routes>
            <Route path="/" element={
              <AppContainer>
                {!selectedCategory ? (
                  <>
                    <Hero isVisible={true} />
                    <CategoryList onCategorySelect={handleCategorySelect} />
                  </>
                ) : !cards || cards.length === 0 ? (
                  <SpendingForm
                    category={selectedCategory}
                    onSubmit={handleFormSubmit}
                    onBack={handleBack}
                  />
                ) : (
                  <CardResults
                    cards={cards}
                    onReset={handleResultsBack}
                    isLoading={isLoading}
                    error={error}
                    category={selectedCategory}
                    formData={formData}
                    onAuthClick={handleAuthClick}
                    isAuthenticated={isAuthenticatedUser}
                  />
                )}
              </AppContainer>
            } />
          </Routes>
        </MainContent>
        <Footer />
        <Toaster position="top-right" />

        {showSignUp && (
          <SignUp 
            onClose={() => setShowSignUp(false)}
            onSuccess={handleSignUpSuccess}
          />
        )}
      </AppContainer>
    </Router>
  );
};

export default App; 