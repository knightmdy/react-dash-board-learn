import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ExportData {
  [key: string]: any;
}

export function useDataExport() {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToJSON = async (data: ExportData, filename: string) => {
    try {
      setIsExporting(true);
      
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "导出成功",
        description: `数据已导出为 ${filename}.json`,
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: "数据导出过程中发生错误",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = async (data: any[], filename: string) => {
    try {
      setIsExporting(true);
      
      if (data.length === 0) {
        throw new Error('没有数据可导出');
      }
      
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => 
            typeof row[header] === 'string' && row[header].includes(',') 
              ? `"${row[header]}"` 
              : row[header]
          ).join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "导出成功",
        description: `数据已导出为 ${filename}.csv`,
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: error instanceof Error ? error.message : "数据导出过程中发生错误",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportToJSON,
    exportToCSV,
    isExporting
  };
}