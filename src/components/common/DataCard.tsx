import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onExport?: () => void;
  onRefresh?: () => void;
  className?: string;
  loading?: boolean;
  actions?: React.ReactNode;
}

export function DataCard({
  title,
  description,
  children,
  onExport,
  onRefresh,
  className,
  loading = false,
  actions
}: DataCardProps) {
  return (
    <Card className={cn("bg-gradient-to-br from-card to-card/50 border-border/50", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {actions}
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={loading}
              >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              </Button>
            )}
            {onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                disabled={loading}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn(loading && "opacity-50 pointer-events-none")}>
        {children}
      </CardContent>
    </Card>
  );
}