import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children?: React.ReactNode;
}

export function FormField({ label, htmlFor, required, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-primary">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function LabeledInput({ label, hint, id, required, ...props }: LabeledInputProps) {
  const fieldId = id || props.name || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <FormField label={label} htmlFor={fieldId} required={required} hint={hint}>
      <Input id={fieldId} required={required} {...props} />
    </FormField>
  );
}

interface LabeledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
}

export function LabeledSelect({ label, hint, id, options, required, ...props }: LabeledSelectProps) {
  const fieldId = id || props.name || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <FormField label={label} htmlFor={fieldId} required={required} hint={hint}>
      <select
        id={fieldId}
        required={required}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </FormField>
  );
}
