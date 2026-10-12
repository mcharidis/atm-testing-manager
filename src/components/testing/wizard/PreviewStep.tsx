'use client';

import React from 'react';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import { testingCategories } from '@/config/testingCategories';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';

export default function PreviewStep() {
  const { session } = useTestingSession();
  const { t } = useTranslation();

  const totalLanguages = session.languages.length || 1;
  const cardsWithTypesCount = session.cards.reduce((acc, card) => {
    let types = 0;
    if (card.contact) types += 1;
    if (card.contactless) types += 1;
    return acc + types;
  }, 0);

  let totalTestCases = 0;

  session.selectedCategoryIds.forEach(catId => {
    const cat = testingCategories.find(c => c.id === catId);
    if (!cat) return;
    
    let optionCombinations = 1;
    const catConfig = session.categoryConfigs[catId] || {};
    
    if (cat.options && cat.options.length > 0) {
      cat.options.forEach(opt => {
        const vals = catConfig[opt.key] || opt.defaults;
        if (vals && vals.length > 0) {
          optionCombinations *= vals.length;
        }
      });
    }
    
    if (cat.cardIndependent) {
      totalTestCases += optionCombinations;
      return;
    }

    totalTestCases += cardsWithTypesCount * totalLanguages * optionCombinations;
    // Additional scenarios apply per card-dependent category
    totalTestCases += session.additionalScenarios.length * cardsWithTypesCount;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6">{t('Total Test Cases Generated')}</Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{totalTestCases}</Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>{t('General Information')}</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">{t('ATM')}</Typography>
            <Typography>{session.generalInfo.atm || '-'}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">{t('Version')}</Typography>
            <Typography>{session.generalInfo.version || '-'}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">{t('Environment')}</Typography>
            <Typography>{session.generalInfo.environment || '-'}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">{t('Date')}</Typography>
            <Typography>{session.generalInfo.date || '-'}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">{t('Tester')}</Typography>
            <Typography>{session.generalInfo.tester || '-'}</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>{t('Cards')}</Typography>
        <List dense>
          {session.cards.map(card => {
            const maskedPan = card.pan.length > 4 ? `**** **** **** ${card.pan.slice(-4)}` : card.pan;
            const modes = [card.contact ? 'Contact' : '', card.contactless ? 'Contactless' : ''].filter(Boolean).join(', ');
            return (
               <ListItem key={card.id}>
                <ListItemText
                  primary={`${card.type} - ${card.family} (${modes})`}
                  secondary={`PAN: ${maskedPan}`}
                />
              </ListItem>
            );
          })}
          {session.cards.length === 0 && <Typography color="textSecondary">{t('No cards added.')}</Typography>}
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>{t('Selected Categories')}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {session.selectedCategoryIds.map(catId => {
            const cat = testingCategories.find(c => c.id === catId);
            return cat ? (
              <Box key={cat.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlined color="success" />
                <Typography>{t(cat.name)}</Typography>
              </Box>
            ) : null;
          })}
          {session.selectedCategoryIds.length === 0 && <Typography color="textSecondary">{t('No categories selected.')}</Typography>}
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>{t('Languages')}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {session.languages.map(lang => (
            <Chip key={lang} label={lang} />
          ))}
          {session.languages.length === 0 && <Typography color="textSecondary">{t('Default language only.')}</Typography>}
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>{t('Category Configurations')}</Typography>
        {session.selectedCategoryIds.map(catId => {
          const cat = testingCategories.find(c => c.id === catId);
          if (!cat || !cat.options || cat.options.length === 0) return null;
          
          const catConfig = session.categoryConfigs[catId] || {};
          return (
            <Box key={cat.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t(cat.name)}</Typography>
              {cat.options.map(opt => {
                const vals = catConfig[opt.key] || opt.defaults;
                return (
                  <Typography key={opt.key} variant="body2" sx={{ ml: 2 }}>
                    • {t(opt.label)}: {vals.join(', ')}
                  </Typography>
                );
              })}
            </Box>
          );
        })}
        {session.selectedCategoryIds.filter(catId => {
          const cat = testingCategories.find(c => c.id === catId);
          return cat && cat.options && cat.options.length > 0;
        }).length === 0 && (
          <Typography color="textSecondary">{t('No configurations applied.')}</Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>{t('Additional Scenarios')}</Typography>
        <List dense>
          {session.additionalScenarios.map((scenario, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={scenario} />
            </ListItem>
          ))}
          {session.additionalScenarios.length === 0 && <Typography color="textSecondary">{t('No additional scenarios.')}</Typography>}
        </List>
      </Paper>
    </Box>
  );
}
