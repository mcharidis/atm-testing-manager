'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { TestStatus } from '@/types/testing';
import { testingCategories } from '@/config/testingCategories';
import { useTestingSession } from '@/context/TestingSessionContext';
import { useTranslation } from '@/i18n/useTranslation';
import { exportToExcel } from '@/utils/excelExport';
import TestingProgress from './TestingProgress';
import CategoryTestList from './CategoryTestList';
import TestCaseDetail from './TestCaseDetail';

type ViewMode = 'list' | 'detail';

export default function TestingSessionView() {
  const router = useRouter();
  const { t } = useTranslation();
  const { session, dispatch } = useTestingSession();
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedTestIdx, setSelectedTestIdx] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Get the category IDs that have test cases
  const activeCategoryIds = useMemo(() => {
    return session.selectedCategoryIds.filter((catId) =>
      session.testCases.some((tc) => tc.categoryId === catId)
    );
  }, [session.selectedCategoryIds, session.testCases]);

  // Get test cases for the current tab's category
  const currentCategoryId = activeCategoryIds[activeTab] ?? '';
  const categoryTestCases = useMemo(() => {
    return session.testCases.filter((tc) => tc.categoryId === currentCategoryId);
  }, [session.testCases, currentCategoryId]);

  const handleSelectTestCase = (index: number) => {
    setSelectedTestIdx(index);
    setViewMode('detail');
  };

  const handleUpdateTestCase = (id: string, status: TestStatus, comments: string) => {
    dispatch({ type: 'UPDATE_TEST_CASE', payload: { id, status, comments } });
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportToExcel(session);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
      // We don't automatically close or reset here, let the user explicitly click "Complete"
    }
  };

  const handleCompleteSession = () => {
    dispatch({ type: 'RESET' });
    router.push('/testing/new'); // Go straight to new testing
  };

  const getCategoryName = (catId: string) => {
    const cat = testingCategories.find((c) => c.id === catId);
    return cat ? t(cat.name) : catId;
  };

  if (session.testCases.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          No test cases generated yet.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Go to &quot;New Test&quot; to create a testing session.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          {t('testing.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {viewMode === 'detail' && (
            <Button variant="outlined" onClick={() => setViewMode('list')}>
              Back to List
            </Button>
          )}
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => setShowComplete(true)}
          >
            {t('action.complete')}
          </Button>
        </Box>
      </Box>

      {/* Progress */}
      <TestingProgress testCases={session.testCases} />

      {/* Category Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, newVal) => {
          setActiveTab(newVal);
          setViewMode('list');
        }}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
      >
        {activeCategoryIds.map((catId) => (
          <Tab
            key={catId}
            label={getCategoryName(catId)}
          />
        ))}
      </Tabs>

      {/* Content */}
      {viewMode === 'list' ? (
        <CategoryTestList
          testCases={categoryTestCases}
          onSelectTestCase={handleSelectTestCase}
        />
      ) : (
        <TestCaseDetail
          key={categoryTestCases[selectedTestIdx].id}
          testCase={categoryTestCases[selectedTestIdx]}
          index={selectedTestIdx}
          total={categoryTestCases.length}
          onUpdate={handleUpdateTestCase}
          onPrevious={() => setSelectedTestIdx(Math.max(0, selectedTestIdx - 1))}
          onNext={() => setSelectedTestIdx(Math.min(categoryTestCases.length - 1, selectedTestIdx + 1))}
        />
      )}

      {/* Complete Dialog */}
      <Dialog open={showComplete} onClose={() => setShowComplete(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('action.complete')}</DialogTitle>
        <DialogContent>
          <TestingProgress testCases={session.testCases} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Export results to Excel?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setShowComplete(false)}>Cancel</Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={exporting}
            color="primary"
          >
            {exporting ? 'Exporting...' : 'Save to Excel'}
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={handleCompleteSession}
          >
            Complete Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
