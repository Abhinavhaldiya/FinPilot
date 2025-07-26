import React from 'react';

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  className?: string;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const RadioGroup: React.FC<RadioGroupProps> = ({ value, onValueChange, children, className = '' }) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={`grid gap-2 ${className}`}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id, className = '' }) => {
  const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext);
  const isSelected = selectedValue === value;
  
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        id={id}
        className={`aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onClick={() => onValueChange?.(value)}
      >
        {isSelected && (
          <div className="flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-current" />
          </div>
        )}
      </button>
    </div>
  );
};

export { RadioGroup, RadioGroupItem };