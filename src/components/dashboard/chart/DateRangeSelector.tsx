import { Button } from "@/components/ui/button";

interface DateRange {
  label: string;
  value: string;
}

interface DateRangeSelectorProps {
  dateRanges: DateRange[];
  selectedRange: string;
  onRangeSelect: (value: string) => void;
}

const DateRangeSelector = ({ 
  dateRanges, 
  selectedRange, 
  onRangeSelect 
}: DateRangeSelectorProps) => {
  return (
    <div className="flex gap-2">
      {dateRanges.map((range) => (
        <Button
          key={range.value}
          variant="outline"
          size="sm"
          onClick={() => onRangeSelect(range.value)}
          className={`text-gray-400 border-white/10 ${
            selectedRange === range.value ? 'bg-[#1A2333]' : ''
          }`}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};

export default DateRangeSelector;