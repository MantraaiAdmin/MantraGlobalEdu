import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-premium hover:shadow-premium-lg hover:bg-primary/90 active:scale-[0.98]',
        accent:
          'bg-gradient-to-r from-accent to-[#D4A017] text-accent-foreground shadow-glow-sm hover:shadow-glow hover:brightness-105 active:scale-[0.98]',
        outline:
          'border border-border bg-white/80 shadow-sm hover:bg-muted hover:border-primary/20 active:scale-[0.98]',
        ghost: 'hover:bg-muted/80',
        link: 'text-primary underline-offset-4 hover:underline',
        premium:
          'bg-white text-primary border border-white/60 shadow-premium-lg hover:shadow-premium-xl hover:-translate-y-0.5 active:scale-[0.98]',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-14 rounded-xl px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
