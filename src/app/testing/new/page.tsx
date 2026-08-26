'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTranslation } from '@/i18n/useTranslation';
import { useTestingSession } from '@/context/TestingSessionContext';
import { generateTestCases } from '@/utils/generateTestCases';
import GeneralInfoStep from '@/components/testing/wizard/GeneralInfoStep';
import CategorySelectStep from '@/components/testing/wizard/CategorySelectStep';
import CardConfigStep from '@/components/testing/wizard/CardConfigStep';
import CategoryConfigStep from '@/components/testing/wizard/CategoryConfigStep';
import LanguageSelectStep from '@/components/testing/wizard/LanguageSelectStep';
import AdditionalScenariosStep from '@/components/testing/wizard/AdditionalScenariosStep';
import PreviewStep from '@/components/testing/wizard/PreviewStep';

const stepKeys = [
  'wizard.step.general',
  'wizard.step.categories',
  'wizard.step.cards',
  'wizard.step.config',
  'wizard.step.languages',
  'wizard.step.scenarios',
  'wizard.step.preview',
];

export default function NewTestPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session, dispatch } = useTestingSession();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, stepKeys.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleCreatePlan = () => {
    // Generate test cases from the session configuration
    const testCases = generateTestCases(session);
    dispatch({ type: 'SET_TEST_CASES', payload: testCases });
    // Navigate to the testing session page
    router.push('/testing/session');
  };

  // Validation: can we proceed to next step?
  const canProceed = (): boolean => {
    switch (activeStep) {
      case 0: // General Info
        return !!(session.generalInfo.atm && session.generalInfo.tester);
      case 1: // Categories
        return session.selectedCategoryIds.length > 0;
      case 2: // Cards
        return session.cards.length > 0;
      case 3: // Config
        return true; // defaults are always valid
      case 4: // Languages
        return session.languages.length > 0;
      case 5: // Scenarios
        return true; // optional
      case 6: // Preview
        return true;
      default:
        return true;
    }
  };

  const isLastStep = activeStep === stepKeys.length - 1;

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <GeneralInfoStep />;
      case 1:
        return <CategorySelectStep />;
      case 2:
        return <CardConfigStep />;
      case 3:
        return <CategoryConfigStep />;
      case 4:
        return <LanguageSelectStep />;
      case 5:
        return <AdditionalScenariosStep />;
      case 6:
        return <PreviewStep />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('menu.testing.new')}
      </Typography>

      {/* Stepper */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {stepKeys.map((key) => (
            <Step key={key}>
              <StepLabel>{t(key)}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step Content */}
      <Box sx={{ mb: 3 }}>
        {renderStep()}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {t('action.previous')}
        </Button>

        {isLastStep ? (
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={handleCreatePlan}
            color="success"
          >
            {t('preview.createPlan')}
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<NavigateNextIcon />}
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {t('action.next')}
          </Button>
        )}
      </Box>
    </Box>
  );
}
