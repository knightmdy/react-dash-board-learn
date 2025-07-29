import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon?: LucideIcon;
  description?: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeVariants = {
  sm: {
    card: 'p-4',
    value: 'text-xl',
    title: 'text-xs',
    icon: 'h-4 w-4',
    iconContainer: 'p-2'
  },
  md: {
    card: 'p-6',
    value: 'text-3xl',
    title: 'text-sm',
    icon: 'h-6 w-6',
    iconContainer: 'p-3'
  },
  lg: {
    card: 'p-8',
    value: 'text-4xl',
    title: 'text-base',
    icon: 'h-8 w-8',
    iconContainer: 'p-4'
  }
};

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  gradient = 'from-primary to-primary-glow',
  size = 'md',
  className
}: MetricCardProps) {
  const sizeConfig = sizeVariants[size];

  return (
    <Card className={cn(
      "relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", gradient)} />
      <CardContent className={sizeConfig.card}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={cn("font-medium text-muted-foreground", sizeConfig.title)}>
              {title}
            </p>
            <p className={cn("font-bold text-foreground", sizeConfig.value)}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {change && (
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    'text-sm font-medium',
                    change.type === 'positive' && 'text-success',
                    change.type === 'negative' && 'text-destructive',
                    change.type === 'neutral' && 'text-muted-foreground'
                  )}
                >
                  {change.value}
                </span>
                {description && (
                  <span className="text-xs text-muted-foreground">{description}</span>
                )}
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn(
              "rounded-full bg-gradient-to-br",
              gradient,
              sizeConfig.iconContainer
            )}>
              <Icon className={cn("text-white", sizeConfig.icon)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}