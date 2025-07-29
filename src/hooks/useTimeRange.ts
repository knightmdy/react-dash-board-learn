import { useState, useMemo } from 'react';

export type TimeRange = '7days' | '30days' | '90days' | 'custom';

export interface TimeRangeConfig {
  label: string;
  days: number;
  startDate: Date;
  endDate: Date;
}

export function useTimeRange(defaultRange: TimeRange = '7days') {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(defaultRange);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);

  const timeRangeConfig = useMemo((): TimeRangeConfig => {
    const now = new Date();
    const endDate = new Date(now);
    
    switch (selectedRange) {
      case '7days':
        return {
          label: '近7天',
          days: 7,
          startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          endDate
        };
      case '30days':
        return {
          label: '近30天',
          days: 30,
          startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          endDate
        };
      case '90days':
        return {
          label: '近90天',
          days: 90,
          startDate: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
          endDate
        };
      case 'custom':
        return {
          label: '自定义',
          days: customStartDate && customEndDate 
            ? Math.ceil((customEndDate.getTime() - customStartDate.getTime()) / (24 * 60 * 60 * 1000))
            : 0,
          startDate: customStartDate || new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          endDate: customEndDate || endDate
        };
      default:
        return {
          label: '近7天',
          days: 7,
          startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          endDate
        };
    }
  }, [selectedRange, customStartDate, customEndDate]);

  const setTimeRange = (range: TimeRange) => {
    setSelectedRange(range);
  };

  const setCustomDateRange = (startDate: Date, endDate: Date) => {
    setCustomStartDate(startDate);
    setCustomEndDate(endDate);
    setSelectedRange('custom');
  };

  return {
    selectedRange,
    timeRangeConfig,
    setTimeRange,
    setCustomDateRange,
    customStartDate,
    customEndDate
  };
}