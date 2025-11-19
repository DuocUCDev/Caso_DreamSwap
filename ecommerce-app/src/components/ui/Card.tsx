import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-md p-6', className)} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }: CardProps) => {
  return (
    <h3 className={cn('text-xl font-semibold text-gray-900', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

