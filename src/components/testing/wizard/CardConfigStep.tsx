'use client';

import React from 'react';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import { cardPresets } from '@/config/cardPresets';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';

export default function CardConfigStep() {
  const { session, dispatch } = useTestingSession();
  const { t } = useTranslation();

  const handleAddCard = () => {
    dispatch({ 
      type: 'ADD_CARD', 
      payload: { id: uuidv4(), type: '', family: '', pan: '', contact: true, contactless: true } 
    });
  };

  const handleUpdateCard = (id: string, updates: Partial<typeof session.cards[0]>) => {
    const card = session.cards.find(c => c.id === id);
    if (card) {
      dispatch({ type: 'UPDATE_CARD', payload: { ...card, ...updates } });
    }
  };

  const handleRemoveCard = (id: string) => {
    dispatch({ type: 'REMOVE_CARD', payload: id });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {session.cards.map(card => (
        <Paper key={card.id} sx={{ p: 3, position: 'relative' }}>
          <IconButton 
            onClick={() => handleRemoveCard(card.id)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            <Box>
              <TextField
                fullWidth
                select
                label={t('Card Type')}
                value={card.type && card.family ? `${card.type} ${card.family}` : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const preset = cardPresets.find(p => `${p.type} ${p.family}` === val);
                  if (preset) {
                    handleUpdateCard(card.id, { type: preset.type, family: preset.family });
                  }
                }}
              >
                {cardPresets.map(preset => {
                  const val = `${preset.type} ${preset.family}`;
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
            <Box>
              <TextField
                fullWidth
                label={t('PAN')}
                value={card.pan}
                onChange={(e) => handleUpdateCard(card.id, { pan: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControlLabel
                control={<Switch checked={card.contact} onChange={(e) => handleUpdateCard(card.id, { contact: e.target.checked })} />}
                label={t('Contact')}
              />
              <FormControlLabel
                control={<Switch checked={card.contactless} onChange={(e) => handleUpdateCard(card.id, { contactless: e.target.checked })} />}
                label={t('Contactless')}
              />
            </Box>
          </Box>
        </Paper>
      ))}
      <Button 
        variant="outlined" 
        startIcon={<AddIcon />} 
        onClick={handleAddCard}
        sx={{ alignSelf: 'flex-start' }}
      >
        {t('Add Card')}
      </Button>
    </Box>
  );
}
