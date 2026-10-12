'use client';

import React from 'react';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import { testingCategories } from '@/config/testingCategories';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import AccountBalance from '@mui/icons-material/AccountBalance';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import Receipt from '@mui/icons-material/Receipt';
import Savings from '@mui/icons-material/Savings';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import Pin from '@mui/icons-material/Pin';
import CreditCardOff from '@mui/icons-material/CreditCardOff';
import LockOpen from '@mui/icons-material/LockOpen';
import Settings from '@mui/icons-material/Settings';

const iconMap: Record<string, React.ReactNode> = {
  AccountBalance: <AccountBalance fontSize="large" />,
  AccountBalanceWallet: <AccountBalanceWallet fontSize="large" />,
  Receipt: <Receipt fontSize="large" />,
  Savings: <Savings fontSize="large" />,
  SwapHoriz: <SwapHoriz fontSize="large" />,
  Pin: <Pin fontSize="large" />,
  CreditCardOff: <CreditCardOff fontSize="large" />,
  LockOpen: <LockOpen fontSize="large" />,
  Settings: <Settings fontSize="large" />,
};

export default function CategorySelectStep() {
  const { session, dispatch } = useTestingSession();
  const { t } = useTranslation();

  const handleToggle = (categoryId: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY', payload: categoryId });
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
      {testingCategories.map(category => (
        <Box key={category.id}>
          <Card 
            onClick={() => handleToggle(category.id)}
            sx={{ 
              cursor: 'pointer',
              border: session.selectedCategoryIds.includes(category.id) ? 2 : 0,
              borderColor: 'primary.main',
              height: '100%'
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {iconMap[category.icon] || <Receipt fontSize="large" />}
                <Typography variant="h6">{t(category.name)}</Typography>
              </Box>
              <Checkbox
                checked={session.selectedCategoryIds.includes(category.id)}
                onChange={() => handleToggle(category.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
