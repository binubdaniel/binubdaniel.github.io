import React, { ReactNode } from 'react';
import { AlertCircle, Info, XCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from '@/lib/utils';

type BannerType = 'info' | 'success' | 'warning' | 'error';

interface InfoBannerProps {
  message: string;
  type?: BannerType;
  icon?: ReactNode;
  show?: boolean;
  onClose?: () => void;
  className?: string;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({
  message,
  type = 'info',
  icon,
  show = true,
  onClose,
  className
}) => {
  if (!show) return null;

  const getDefaultIcon = () => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'error':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'info':
        return 'default';
      case 'success':
        return 'default';
      case 'warning':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Alert 
      variant={getVariant()}
      className={cn("mb-0 relative", 
        type === 'info' && "border-primary/50 bg-primary/5 text-foreground",
        type === 'success' && "border-green-500/50 bg-green-500/5 text-foreground",
        type === 'warning' && "border-yellow-500/50 bg-yellow-500/5 text-foreground",
        type === 'error' && "border-destructive/50 bg-destructive/5",
        className
      )}
    >
      <div className={cn(
        "mr-2",
        type === 'info' && "text-primary",
        type === 'success' && "text-green-500",
        type === 'warning' && "text-yellow-500", 
        type === 'error' && "text-destructive"
      )}>
        {icon || getDefaultIcon()}
      </div>
      <AlertDescription>{message}</AlertDescription>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
};