'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import ScienceIcon from '@mui/icons-material/Science';
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
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          {t('dashboard.description')}
        </Typography>
        <Button
          href="/testing/new"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          {t('action.startTest')}
        </Button>
      </Paper>

      {/* Quick stats placeholder */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t('dashboard.recentTests')}
      </Typography>

      <Card sx={{ borderStyle: 'dashed', borderWidth: 2, borderColor: 'grey.300' }}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <ScienceIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            {t('dashboard.noTests')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
