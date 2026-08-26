'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ScienceIcon from '@mui/icons-material/Science';
import { useTranslation } from '@/i18n/useTranslation';
import MellonLogo from '../../assets/Mellon-logo.png';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { t, locale, setLocale } = useTranslation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          {/* Logo / Link Home */}
          <Box 
            component={Link} 
            href="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            {/* <ScienceIcon sx={{ color: 'primary.main', fontSize: 28 }} /> */}
            <img src={MellonLogo.src} alt="Mellon Logo" style={{ height: 28 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{ color: 'primary.main', fontWeight: 700 }}
            >
              {t('app.title')}
            </Typography>
          </Box>

          {/* Language Toggle */}
          <ToggleButtonGroup
            value={locale}
            exclusive
            onChange={(_, newLocale) => {
              if (newLocale) setLocale(newLocale);
            }}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                px: 1.5,
                py: 0.5,
                fontSize: '0.8rem',
                fontWeight: 600,
              },
            }}
          >
            <ToggleButton value="en">EN</ToggleButton>
            <ToggleButton value="el">EL</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          pt: { xs: 10, md: 12 },
          width: '100%',
          maxWidth: 1200,
          mx: 'auto'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
