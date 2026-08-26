'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SaveIcon from '@mui/icons-material/Save';
import type { TestCase, TestStatus } from '@/types/testing';
import { useTranslation } from '@/i18n/useTranslation';

interface TestCaseDetailProps {
  testCase: TestCase;
  index: number;
  total: number;
  onUpdate: (id: string, status: TestStatus, comments: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const statusOptions: TestStatus[] = ['Untested', 'Pass', 'Fail', 'Blocked', 'N/A'];

const statusColorMap: Record<TestStatus, 'default' | 'success' | 'error' | 'warning' | 'info'> = {
  'Untested': 'default',
  'Pass': 'success',
  'Fail': 'error',
  'Blocked': 'warning',
  'N/A': 'info',
};

export default function TestCaseDetail({
  testCase,
  index,
  total,
  onUpdate,
  onPrevious,
  onNext,
}: TestCaseDetailProps) {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<TestStatus>(testCase.status);
  const [comments, setComments] = React.useState(testCase.comments);

  // Local state initialized from props (remounts on key change)

  const handleSave = () => {
    onUpdate(testCase.id, status, comments);
  };

  const handlePrevious = () => {
    handleSave();
    onPrevious();
  };

  const handleNext = () => {
    handleSave();
    onNext();
  };

  // Mask PAN: show only last 4 digits
  const maskedPan = testCase.card.pan.length > 4
    ? '****' + testCase.card.pan.slice(-4)
    : testCase.card.pan;

  // Build summary from option values
  const optionSummary = Object.entries(testCase.optionValues)
    .map(([key, val]) => `${key}: ${val}`)
    .join(' | ');

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          {t('testing.testNumber')} #{index + 1}
        </Typography>
        <Chip
          label={`${index + 1} / ${total}`}
          variant="outlined"
          size="small"
        />
      </Box>

      {testCase.scenario && (
        <Chip
          label={testCase.scenario}
          color="warning"
          sx={{ mb: 2 }}
        />
      )}

      <Divider sx={{ mb: 2 }} />

      {/* Test Case Info */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              {t('testing.card')}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {testCase.card.type} {testCase.card.family}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PAN: {maskedPan}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              {t('testing.transaction')}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {testCase.transactionType}
            </Typography>
          </Box>

          {testCase.language && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('testing.language')}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {testCase.language}
              </Typography>
            </Box>
          )}
        </Box>

        {optionSummary && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Details
            </Typography>
            <Typography variant="body1">
              {optionSummary}
            </Typography>
          </Box>
        )}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Status */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>{t('testing.status')}</InputLabel>
        <Select
          value={status}
          label={t('testing.status')}
          onChange={(e) => setStatus(e.target.value as TestStatus)}
        >
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>
              <Chip
                label={s}
                size="small"
                color={statusColorMap[s]}
                sx={{ mr: 1 }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Comments */}
      <TextField
        label={t('testing.comments')}
        multiline
        rows={4}
        fullWidth
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          onClick={handlePrevious}
          disabled={index === 0}
        >
          {t('action.previous')}
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          color="primary"
        >
          {t('action.save')}
        </Button>

        <Button
          variant="outlined"
          endIcon={<NavigateNextIcon />}
          onClick={handleNext}
          disabled={index === total - 1}
        >
          {t('action.next')}
        </Button>
      </Box>
    </Paper>
  );
}
