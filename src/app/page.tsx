'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import ScienceIcon from '@mui/icons-material/Science';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useTranslation } from '@/i18n/useTranslation';

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <Box>
      {/* Welcome section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #1A237E 0%, #534bae 100%)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
          <ScienceIcon sx={{ fontSize: 40 }} />
          <Typography variant="h4">
            {t('dashboard.welcome')}
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {t('dashboard.description')}
        </Typography>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {/* New Test Option */}
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('action.startTest')}
          </Typography>
          <Card 
            component={Link}
            href="/testing/new"
            sx={{ 
              borderStyle: 'solid', 
              borderWidth: 1, 
              borderColor: 'grey.300', 
              textDecoration: 'none',
              display: 'block',
              transition: 'all 0.2s ease-in-out',
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.50',
                boxShadow: 4,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="body1" color="text.primary">
                {t('action.startTest')}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Ticket placeholder */}
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('dashboard.newTicket')}
          </Typography>
          <Card 
            component={Link}
            href="/ticket/new"
            sx={{ 
              borderStyle: 'solid', 
              borderWidth: 1, 
              borderColor: 'grey.300',
              textDecoration: 'none',
              display: 'block',
              transition: 'all 0.2s ease-in-out',
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.50',
                boxShadow: 4,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <ConfirmationNumberIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="body1" color="text.primary">
                {t('dashboard.ticketDesc')}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
