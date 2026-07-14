import Link from 'next/link';
import type { ComponentProps } from 'react';

type NavLinkProps = ComponentProps<'a'> & {
  href: string;
};

export function NavLink({ href, children, ...props }: NavLinkProps) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
