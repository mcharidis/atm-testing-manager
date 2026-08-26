'use client';

import React from 'react';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function GeneralInfoStep() {
  const { session, dispatch } = useTestingSession();
  const { t } = useTranslation();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_GENERAL_INFO',
      payload: { ...session.generalInfo, [field]: e.target.value }
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('General Information')}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <TextField
            fullWidth
            label={t('ATM')}
            value={session.generalInfo.atm}
            onChange={handleChange('atm')}
            placeholder="ATM-001"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label={t('Version')}
            value={session.generalInfo.version}
            onChange={handleChange('version')}
            placeholder="K3A 7.x"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            select
            label={t('Environment')}
            value={session.generalInfo.environment}
            onChange={handleChange('environment')}
          >
            <MenuItem value="SIT">SIT</MenuItem>
            <MenuItem value="UAT">UAT</MenuItem>
            <MenuItem value="Production">Production</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField
            fullWidth
            type="date"
            label={t('Date')}
            value={session.generalInfo.date || new Date().toISOString().split('T')[0]}
            onChange={handleChange('date')}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label={t('Tester')}
            value={session.generalInfo.tester}
            onChange={handleChange('tester')}
          />
        </Box>
      </Box>
    </Paper>
  );
}
