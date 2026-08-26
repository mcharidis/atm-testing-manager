'use client';

import React, { useState } from 'react';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import { defaultLanguages } from '@/config/defaultLanguages';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, TextField, Button, Paper, Divider } from '@mui/material';

export default function LanguageSelectStep() {
  const { session, dispatch } = useTestingSession();
  const { t } = useTranslation();
  const [customCode, setCustomCode] = useState('');
  const [customName, setCustomName] = useState('');

  const handleToggle = (code: string) => {
    let newLangs;
    if (session.languages.includes(code)) {
      newLangs = session.languages.filter(l => l !== code);
    } else {
      newLangs = [...session.languages, code];
    }
    dispatch({ type: 'SET_LANGUAGES', payload: newLangs });
  };

  const handleAddCustom = () => {
    if (customCode && !session.languages.includes(customCode)) {
      dispatch({ type: 'SET_LANGUAGES', payload: [...session.languages, customCode] });
      setCustomCode('');
      setCustomName('');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>{t('Select Languages')}</Typography>
      <FormGroup row sx={{ mb: 4 }}>
        {defaultLanguages.map(lang => (
          <FormControlLabel
            key={lang.code}
            control={
              <Checkbox
                checked={session.languages.includes(lang.code)}
                onChange={() => handleToggle(lang.code)}
              />
            }
            label={t(lang.name)}
            sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}
          />
        ))}
        {session.languages.filter(code => !defaultLanguages.some(dl => dl.code === code)).map(code => (
           <FormControlLabel
           key={code}
           control={
             <Checkbox
               checked={true}
               onChange={() => handleToggle(code)}
             />
           }
           label={code}
           sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}
         />
        ))}
      </FormGroup>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>{t('Add Custom Language')}</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label={t('Language Code')}
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="e.g. pt-BR"
        />
        <TextField
          size="small"
          label={t('Language Name')}
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="e.g. Portuguese"
        />
        <Button variant="contained" onClick={handleAddCustom} disabled={!customCode}>
          {t('Add')}
        </Button>
      </Box>
    </Paper>
  );
}
