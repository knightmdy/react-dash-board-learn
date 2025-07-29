import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { TimeRange } from '@/hooks/useTimeRange';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  onCustomDateRange?: (startDate: Date, endDate: Date) => void;
  customStartDate?: Date | null;
  customEndDate?: Date | null;
  className?: string;
}

const timeRangeOptions = [
  { value: '7days' as const, label: '近7天' },
  { value: '30days' as const, label: '近30天' },
  { value: '90days' as const, label: '近90天' },
  { value: 'custom' as const, label: '自定义' }
];

export function TimeRangeSelector({
  selectedRange,
  onRangeChange,
  onCustomDateRange,
  customStartDate,
  customEndDate,
  className
}: TimeRangeSelectorProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [tempStartDate, setTempStartDate] = React.useState<Date | undefined>(
    customStartDate || undefined
  );
  const [tempEndDate, setTempEndDate] = React.useState<Date | undefined>(
    customEndDate || undefined
  );

  const handleCustomDateConfirm = () => {
    if (tempStartDate && tempEndDate && onCustomDateRange) {
      onCustomDateRange(tempStartDate, tempEndDate);
      setIsDatePickerOpen(false);
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {timeRangeOptions.slice(0, 3).map((option) => (
        <Button
          key={option.value}
          variant={selectedRange === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onRangeChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
      
      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={selectedRange === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              if (selectedRange !== 'custom') {
                onRangeChange('custom');
              }
              setIsDatePickerOpen(true);
            }}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {selectedRange === 'custom' && customStartDate && customEndDate
              ? `${format(customStartDate, 'MM/dd', { locale: zhCN })} - ${format(customEndDate, 'MM/dd', { locale: zhCN })}`
              : '自定义'
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">开始日期</label>
              <Calendar
                mode="single"
                selected={tempStartDate}
                onSelect={setTempStartDate}
                disabled={(date) => 
                  date > new Date() || (tempEndDate && date > tempEndDate)
                }
                initialFocus
              />
            </div>
            
            {tempStartDate && (
              <div className="space-y-2">
                <label className="text-sm font-medium">结束日期</label>
                <Calendar
                  mode="single"
                  selected={tempEndDate}
                  onSelect={setTempEndDate}
                  disabled={(date) => 
                    date > new Date() || (tempStartDate && date < tempStartDate)
                  }
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDatePickerOpen(false)}
              >
                取消
              </Button>
              <Button
                size="sm"
                onClick={handleCustomDateConfirm}
                disabled={!tempStartDate || !tempEndDate}
              >
                确认
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}