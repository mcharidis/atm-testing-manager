'use client';

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import type { TestCase, TestStatus } from '@/types/testing';
import { useTranslation } from '@/i18n/useTranslation';

interface CategoryTestListProps {
  testCases: TestCase[];
  onSelectTestCase: (index: number) => void;
}

const statusColorMap: Record<TestStatus, 'default' | 'success' | 'error' | 'warning' | 'info'> = {
  'Untested': 'default',
  'Pass': 'success',
  'Fail': 'error',
  'Blocked': 'warning',
  'N/A': 'info',
};

export default function CategoryTestList({ testCases, onSelectTestCase }: CategoryTestListProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filteredCases = useMemo(() => {
    if (!search.trim()) return testCases;
    const lower = search.toLowerCase();
    return testCases.filter((tc) => {
      const summary = `${tc.card.type} ${tc.card.family} ${tc.transactionType} ${tc.language} ${tc.scenario ?? ''}`;
      const optionStr = Object.values(tc.optionValues).join(' ');
      return (summary + ' ' + optionStr).toLowerCase().includes(lower);
    });
  }, [testCases, search]);

  // Get global index for a filtered test case
  const getGlobalIndex = (tc: TestCase) => {
    return testCases.findIndex((t) => t.id === tc.id);
  };

  return (
    <Box>
      {/* Search */}
      <TextField
        size="small"
        placeholder="Search test cases..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, width: 300 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{t('testing.card')}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{t('testing.transaction')}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{t('testing.language')}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Details</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{t('testing.status')}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{t('testing.comments')}</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCases.map((tc) => {
              const globalIdx = getGlobalIndex(tc);
              return (
                <TableRow
                  key={tc.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onSelectTestCase(globalIdx)}
                >
                  <TableCell>{globalIdx + 1}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {tc.card.type} {tc.card.family}
                    </Typography>
                  </TableCell>
                  <TableCell>{tc.transactionType}</TableCell>
                  <TableCell>{tc.language || '—'}</TableCell>
                  <TableCell>
                    {tc.scenario ? (
                      <Chip label={tc.scenario} size="small" color="warning" variant="outlined" />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {Object.values(tc.optionValues).join(', ')}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={tc.status}
                      size="small"
                      color={statusColorMap[tc.status]}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 150 }}>
                      {tc.comments || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => onSelectTestCase(globalIdx)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredCases.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          No test cases found matching your search.
        </Typography>
      )}
    </Box>
  );
}
