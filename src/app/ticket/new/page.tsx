'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { initialTicketData, KalTicketData } from '@/types/ticket';
import { exportTicketToWord } from '@/utils/wordExport';
import { useTranslation } from '@/i18n/useTranslation';

export default function NewTicketPage() {
  const { t } = useTranslation();
  const [data, setData] = useState<KalTicketData>(initialTicketData);

  const handleChange = (field: keyof KalTicketData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleExportWord = async () => {
    await exportTicketToWord(data);
  };

  const handleCopyToClipboard = async () => {
    const htmlTable = `
      <table border="1" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
        <tbody>
          <tr><td style="font-weight: bold; width: 35%; padding: 4px;">Customer / Bank</td><td style="padding: 4px;">${data.customerBank}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">ATM manufacturer & model</td><td style="padding: 4px;">${data.atmModel}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">OS (version and build number if possible)</td><td style="padding: 4px;">${data.osVersion}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Severity (1 – 4)</td><td style="padding: 4px;">${data.severity}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Time remaining for SLAs</td><td style="padding: 4px;">${data.slaTime}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Environment</td><td style="padding: 4px;">${data.environment}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">NDC/K3A/KTC/Platform version</td><td style="padding: 4px;">${data.platformVersion}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Relevant software information (optional)</td><td style="padding: 4px;">${data.softwareInfo}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Trace / Event Log name & path</td><td style="padding: 4px;">${data.tracePath}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Is K3A running in Hybrid mode?</td><td style="padding: 4px;">${data.hybridMode}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Browser engine for Customer UI?</td><td style="padding: 4px;">${data.browserEngine}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">UI Framework for Customer UI?</td><td style="padding: 4px;">${data.uiFramework}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Mellon engineer</td><td style="padding: 4px;">${data.engineer}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Issue description & frequency in percentage</td><td style="padding: 4px;">${data.issueDescription}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px;">Timestamp & time zone</td><td style="padding: 4px;">${data.timestamp}</td></tr>
          <tr><td colspan="2" style="font-weight: bold; background-color: #e0e0e0; padding: 4px;">Analysis</td></tr>
          <tr><td colspan="2" style="padding: 4px; white-space: pre-wrap;">${data.analysis}</td></tr>
        </tbody>
      </table>
    `;

    try {
      const blob = new Blob([htmlTable], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      alert("Table copied to clipboard! You can now paste it directly into Outlook.");
    } catch (err) {
      console.error("Failed to copy", err);
      alert("Failed to copy to clipboard.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom color="primary.main" sx={{ fontWeight: 'bold' }}>
        New Ticket to KAL
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Fill out the details below to generate a formatted ticket for KAL support.
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <TextField
            label="Customer / Bank"
            value={data.customerBank}
            onChange={handleChange('customerBank')}
            placeholder="e.g. Credia Bank, NBG etc."
            fullWidth
          />
          <TextField
            label="ATM manufacturer & model"
            value={data.atmModel}
            onChange={handleChange('atmModel')}
            placeholder="e.g. ATM HYOSUNG MX8200"
            fullWidth
          />
          <TextField
            label="OS (version and build number)"
            value={data.osVersion}
            onChange={handleChange('osVersion')}
            placeholder="Windows – Build 13392"
            fullWidth
          />
          <TextField
            select
            label="Severity (1 – 4)"
            value={data.severity}
            onChange={handleChange('severity')}
            fullWidth
          >
            <MenuItem value="1 - Critical">1 - Critical</MenuItem>
            <MenuItem value="2 - Major">2 - Major</MenuItem>
            <MenuItem value="3 - Minor">3 - Minor</MenuItem>
            <MenuItem value="4 - Low">4 - Low</MenuItem>
          </TextField>
          <TextField
            label="Time remaining for SLAs"
            value={data.slaTime}
            onChange={handleChange('slaTime')}
            placeholder="(If applicable)"
            fullWidth
          />
          <TextField
            label="Environment"
            value={data.environment}
            onChange={handleChange('environment')}
            placeholder="e.g. Production / Lab / PoC"
            fullWidth
          />
          <TextField
            label="NDC/K3A/KTC/Platform version"
            value={data.platformVersion}
            onChange={handleChange('platformVersion')}
            placeholder="K3A version..."
            fullWidth
          />
          <TextField
            label="Relevant software info (optional)"
            value={data.softwareInfo}
            onChange={handleChange('softwareInfo')}
            placeholder="e.g. KTC, EMV, anti-virus"
            fullWidth
          />
          <TextField
            label="Trace / Event Log name & path"
            value={data.tracePath}
            onChange={handleChange('tracePath')}
            placeholder="URL or Path to traces"
            fullWidth
          />
          <TextField
            select
            label="Is K3A running in Hybrid mode?"
            value={data.hybridMode}
            onChange={handleChange('hybridMode')}
            fullWidth
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            select
            label="Browser engine for Customer UI?"
            value={data.browserEngine}
            onChange={handleChange('browserEngine')}
            fullWidth
          >
            <MenuItem value="Edge">Edge</MenuItem>
            <MenuItem value="IE">IE</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            select
            label="UI Framework for Customer UI?"
            value={data.uiFramework}
            onChange={handleChange('uiFramework')}
            fullWidth
          >
            <MenuItem value="Angular">Angular</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Multi-pages">Multi-pages</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Mellon engineer"
            value={data.engineer}
            onChange={handleChange('engineer')}
            placeholder="Surname Name . Email"
            fullWidth
          />
          <TextField
            label="Issue description & frequency (%)"
            value={data.issueDescription}
            onChange={handleChange('issueDescription')}
            placeholder="Short Description Title, frequency..."
            fullWidth
          />
          <TextField
            label="Timestamp & time zone"
            value={data.timestamp}
            onChange={handleChange('timestamp')}
            placeholder="e.g. 2025-06-30 12:34"
            fullWidth
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Analysis
        </Typography>
        <TextField
          multiline
          rows={6}
          fullWidth
          value={data.analysis}
          onChange={handleChange('analysis')}
          placeholder="Scenario Tested:\n\nExpected Behavior:\n\nObserved Behavior:"
        />

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyToClipboard}
          >
            Copy Table for Outlook
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={handleExportWord}
          >
            Export to Word
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
