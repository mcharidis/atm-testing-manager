'use client';

import React, { useState } from 'react';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import { defaultScenarios } from '@/config/defaultScenarios';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, TextField, Button, Paper, Divider } from '@mui/material';

export default function AdditionalScenariosStep() {
  const { session, dispatch } = useTestingSession();
  const { t } = useTranslation();
  const [customScenario, setCustomScenario] = useState('');

  const handleToggle = (scenario: string) => {
    let newScenarios;
    if (session.additionalScenarios.includes(scenario)) {
      newScenarios = session.additionalScenarios.filter(s => s !== scenario);
    } else {
      newScenarios = [...session.additionalScenarios, scenario];
    }
    dispatch({ type: 'SET_SCENARIOS', payload: newScenarios });
  };

  const handleAddCustom = () => {
    if (customScenario && !session.additionalScenarios.includes(customScenario)) {
      dispatch({ type: 'SET_SCENARIOS', payload: [...session.additionalScenarios, customScenario] });
      setCustomScenario('');
    }
  };

  // Combine default and custom scenarios
  const customScenarios = session.additionalScenarios.filter(s => !defaultScenarios.includes(s));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>{t('Additional Scenarios')}</Typography>
      <FormGroup sx={{ mb: 4 }}>
        {defaultScenarios.map(scenario => (
          <FormControlLabel
            key={scenario}
            control={
              <Checkbox
                checked={session.additionalScenarios.includes(scenario)}
                onChange={() => handleToggle(scenario)}
              />
            }
            label={t(scenario)}
          />
        ))}
        {customScenarios.map(scenario => (
          <FormControlLabel
            key={scenario}
            control={
              <Checkbox
                checked={true}
                onChange={() => handleToggle(scenario)}
              />
            }
            label={scenario}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>{t('Add Custom Scenario')}</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          label={t('Scenario Description')}
          value={customScenario}
          onChange={(e) => setCustomScenario(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddCustom} disabled={!customScenario}>
          {t('Add')}
        </Button>
      </Box>
    </Paper>
  );
}
