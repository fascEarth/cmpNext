import React from 'react';
import { Box, IconButton, MobileStepper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CardSlider = ({ cards }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const cardsPerPage = 3; // Number of cards to show at once
  const totalCards = cards.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % totalPages);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? totalPages - 1 : prevActiveStep - 1
    );
  };

  const startIndex = activeStep * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedCards = cards.slice(startIndex, endIndex);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={handleBack}>
          <ArrowBack />
        </IconButton>
        {displayedCards.map((card, index) => (
          <Box
            key={index}
            sx={{
              width: '300px',
              height: '200px',
              backgroundColor: '#f0f0f0',
              margin: '0 16px',
            }}
          >
            <h3>{card.title}</h3>
          </Box>
        ))}
        <IconButton onClick={handleNext}>
          <ArrowForward />
        </IconButton>
      </Box>
      <MobileStepper
        variant="dots"
        steps={totalPages}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton onClick={handleNext} disabled={activeStep === totalPages - 1}>
            <ArrowForward />
          </IconButton>
        }
        backButton={
          <IconButton onClick={handleBack} disabled={activeStep === 0}>
            <ArrowBack />
          </IconButton>
        }
      />
    </Box>
  );
};

export default CardSlider;
