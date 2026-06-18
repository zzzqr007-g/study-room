import { Download } from 'lucide-react';

interface ExportPDFButtonProps {
  chartRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportPDFButton({ chartRef }: ExportPDFButtonProps) {
  const handleExport = async () => {
    if (!chartRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: 'var(--bg-primary)',
        scale: 2,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add title
      pdf.setFontSize(16);
      pdf.text('学习统计报告', 14, 20);
      pdf.setFontSize(10);
      pdf.text(`生成日期: ${new Date().toLocaleDateString('zh-CN')}`, 14, 28);

      pdf.addImage(imgData, 'PNG', 10, 35, pdfWidth - 20, pdfHeight - 20);

      const dateStr = new Date().toISOString().split('T')[0];
      pdf.save(`study-stats-${dateStr}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-theme-light
        hover:bg-surface-hover transition-all duration-200 cursor-pointer group"
      title="导出 PDF 报告"
    >
      <Download className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
      <span className="text-xs font-medium text-secondary group-hover:text-primary transition-colors">
        导出 PDF
      </span>
    </button>
  );
}
