'use client';

import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';
import HelpOutlined from '@mui/icons-material/HelpOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { TestCase } from '@/types/testing';
import { useTranslation } from '@/i18n/useTranslation';

interface TestingProgressProps {
  testCases: TestCase[];
}

export default function TestingProgress({ testCases }: TestingProgressProps) {
  const { t } = useTranslation();

  const total = testCases.length;
  const pass = testCases.filter((tc) => tc.status === 'Pass').length;
  const fail = testCases.filter((tc) => tc.status === 'Fail').length;
  const blocked = testCases.filter((tc) => tc.status === 'Blocked').length;
  const na = testCases.filter((tc) => tc.status === 'N/A').length;
  const untested = testCases.filter((tc) => tc.status === 'Untested').length;
  const completed = total - untested;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {t('testing.progress')} — {completed}/{total}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progressPercent}
        sx={{
          height: 10,
          borderRadius: 5,
          mb: 1.5,
          bgcolor: 'grey.200',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            bgcolor: fail > 0 ? 'error.main' : 'success.main',
          },
        }}
      />

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
        <Chip
          icon={<CheckCircleIcon />}
          label={`${t('status.pass')}: ${pass}`}
          size="small"
          color="success"
          variant="outlined"
        />
        <Chip
          icon={<CancelIcon />}
          label={`${t('status.fail')}: ${fail}`}
          size="small"
          color="error"
          variant="outlined"
        />
        <Chip
          icon={<BlockIcon />}
          label={`${t('status.blocked')}: ${blocked}`}
          size="small"
          color="warning"
          variant="outlined"
        />
        <Chip
          icon={<HelpOutlined />}
          label={`${t('status.na')}: ${na}`}
          size="small"
          variant="outlined"
        />
        <Chip
          icon={<RadioButtonUncheckedIcon />}
          label={`${t('status.untested')}: ${untested}`}
          size="small"
          variant="outlined"
        />
      </Stack>
    </Paper>
  );
}
