import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { KalTicketData } from '@/types/ticket';

export async function exportTicketToWord(data: KalTicketData) {
  const createRow = (label: string, value: string, isHeader = false) => {
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 35, type: WidthType.PERCENTAGE },
          shading: { fill: isHeader ? "E0E0E0" : undefined },
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true })] })],
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
        }),
        new TableCell({
          width: { size: 65, type: WidthType.PERCENTAGE },
          shading: { fill: isHeader ? "E0E0E0" : undefined },
          children: [new Paragraph({ text: value })],
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
        }),
      ],
    });
  };

  const createAnalysisRow = (label: string, value: string) => {
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnSpan: 2,
          shading: { fill: "E0E0E0" },
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true })] })],
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
        }),
      ],
    });
  };

  const createAnalysisContentRow = (value: string) => {
    // Split by newline to preserve formatting in Word
    const lines = value.split('\n');
    const paragraphs = lines.map(line => new Paragraph({ text: line }));

    return new TableRow({
      children: [
        new TableCell({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnSpan: 2,
          children: paragraphs,
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
        }),
      ],
    });
  };

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    },
    rows: [
      createRow('Customer / Bank', data.customerBank),
      createRow('ATM manufacturer & model', data.atmModel),
      createRow('OS (version and build number if possible)', data.osVersion),
      createRow('Severity (1 – 4)', data.severity),
      createRow('Time remaining for SLAs', data.slaTime),
      createRow('Environment', data.environment),
      createRow('NDC/K3A/KTC/Platform version', data.platformVersion),
      createRow('Relevant software information (optional)', data.softwareInfo),
      createRow('Trace / Event Log name & path', data.tracePath),
      createRow('Is K3A running in Hybrid mode?', data.hybridMode),
      createRow('Browser engine for Customer UI?', data.browserEngine),
      createRow('UI Framework for Customer UI?', data.uiFramework),
      createRow('Mellon engineer', data.engineer),
      createRow('Issue description & frequency in percentage', data.issueDescription),
      createRow('Timestamp & time zone', data.timestamp),
      createAnalysisRow('Analysis', ''),
      createAnalysisContentRow(data.analysis),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "KAL Ticket Submission", bold: true, size: 32 }),
            ],
            spacing: { after: 400 },
          }),
          table,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeDate = new Date().toISOString().split('T')[0];
  saveAs(blob, `KAL_Ticket_${data.customerBank}_${safeDate}.docx`);
}
