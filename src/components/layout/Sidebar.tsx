'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from '@/i18n/useTranslation';

export const DRAWER_WIDTH = 260;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [testingOpen, setTestingOpen] = useState(true);

  const isActive = (path: string) => pathname === path;

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      {/* Logo / Title */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ScienceIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem' }}>
          {t('app.title')}
        </Typography>
      </Box>
      <Divider />

      <List component="nav" sx={{ px: 1, pt: 1 }}>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/"
            selected={isActive('/')}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={t('menu.dashboard')} />
          </ListItemButton>
        </ListItem>

        {/* Testing (collapsible) */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setTestingOpen(!testingOpen)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon><ScienceIcon /></ListItemIcon>
            <ListItemText primary={t('menu.testing')} />
            {testingOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>

        <Collapse in={testingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              href="/testing/new"
              selected={isActive('/testing/new')}
              sx={{ pl: 4, borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary={t('menu.testing.new')} />
            </ListItemButton>

            <ListItemButton
              component={Link}
              href="/testing/history"
              selected={isActive('/testing/history')}
              sx={{ pl: 4, borderRadius: 2, mb: 0.5 }}
              disabled
            >
              <ListItemIcon><HistoryIcon /></ListItemIcon>
              <ListItemText primary={t('menu.testing.history')} />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider sx={{ my: 1 }} />

        {/* Tickets (future) */}
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }} disabled>
            <ListItemIcon><ConfirmationNumberIcon /></ListItemIcon>
            <ListItemText primary={t('menu.tickets')} />
          </ListItemButton>
        </ListItem>

        {/* Settings (future) */}
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }} disabled>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={t('menu.settings')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
