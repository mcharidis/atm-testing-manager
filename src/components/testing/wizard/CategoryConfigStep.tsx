'use client';

import React, { useState } from 'react';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import { testingCategories } from '@/config/testingCategories';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`category-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function CategoryConfigStep() {
  const { session, dispatch } = useTestingSession();
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState('');

  const selectedCats = testingCategories.filter(c => session.selectedCategoryIds.includes(c.id));

  if (selectedCats.length === 0) {
    return <Typography>{t('No categories selected.')}</Typography>;
  }

  const handleConfigChange = (categoryId: string, optionKey: string, value: (string | number)[]) => {
    dispatch({
      type: 'SET_CATEGORY_CONFIG',
      payload: { categoryId, config: { [optionKey]: value } }
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {selectedCats.map((cat, index) => (
            <Tab key={cat.id} label={t(cat.name)} />
          ))}
        </Tabs>
      </Box>
      {selectedCats.map((cat, index) => {
        const categoryConfigs = session.categoryConfigs[cat.id] || {};
        return (
          <TabPanel key={cat.id} value={tabIndex} index={index}>
            {!cat.options || cat.options.length === 0 ? (
              <Typography color="textSecondary">{t('No specific configuration needed for this category.')}</Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {cat.options.map(opt => {
                  const currentValues = categoryConfigs[opt.key] || opt.defaults;

                  return (
                    <Box key={opt.key}>
                      <Typography variant="h6" gutterBottom>{t(opt.label)}</Typography>
                      {opt.type === 'amount-list' && (
                        <Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {currentValues.map((val: string | number) => (
                              <Chip
                                key={String(val)}
                                label={String(val)}
                                onDelete={() => {
                                  const newVals = currentValues.filter((v: string | number) => String(v) !== String(val));
                                  handleConfigChange(cat.id, opt.key, newVals);
                                }}
                              />
                            ))}
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                              size="small"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              placeholder={t('Add custom amount')}
                            />
                            <Button
                              variant="contained"
                              onClick={() => {
                                if (customAmount && !currentValues.map(String).includes(customAmount)) {
                                  handleConfigChange(cat.id, opt.key, [...currentValues, customAmount]);
                                  setCustomAmount('');
                                }
                              }}
                            >
                              {t('Add')}
                            </Button>
                          </Box>
                        </Box>
                      )}
                      {opt.type === 'checkbox-list' && (
                        <FormGroup row>
                          {opt.defaults.map((val: string | number) => (
                            <FormControlLabel
                              key={String(val)}
                              control={
                                <Checkbox
                                  checked={currentValues.map(String).includes(String(val))}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      handleConfigChange(cat.id, opt.key, [...currentValues, val]);
                                    } else {
                                      handleConfigChange(cat.id, opt.key, currentValues.filter((v: string | number) => String(v) !== String(val)));
                                    }
                                  }}
                                />
                              }
                              label={t(String(val))}
                            />
                          ))}
                        </FormGroup>
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </TabPanel>
        );
      })}
    </Paper>
  );
}
