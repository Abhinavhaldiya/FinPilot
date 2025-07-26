import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    const classes = `rounded-lg border border-border bg-card text-card-foreground shadow-sm ${className}`;
    
    return <div ref={ref} className={classes} {...props} />;
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', ...props }, ref) => {
    const classes = `flex flex-col space-y-1.5 p-6 ${className}`;
    
    return <div ref={ref} className={classes} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className = '', ...props }, ref) => {
    const classes = `text-2xl font-semibold leading-none tracking-tight ${className}`;
    
    return <h3 ref={ref} className={classes} {...props} />;
  }
);

CardTitle.displayName = 'CardTitle';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', ...props }, ref) => {
    const classes = `p-6 pt-0 ${className}`;
    
    return <div ref={ref} className={classes} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };