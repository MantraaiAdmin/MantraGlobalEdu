import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema, type BreadcrumbItem } from '@/lib/seo';
import { JsonLd } from './json-ld';
import { cn } from '@/lib/utils';

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. First item should be Home. */
export function Breadcrumbs({
  items,
  className,
  tone = 'light',
}: {
  items: BreadcrumbItem[];
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1 min-w-0">
                {index > 0 && (
                  <ChevronRight
                    aria-hidden="true"
                    className={cn('h-3.5 w-3.5 shrink-0', tone === 'dark' ? 'text-white/50' : 'text-muted-foreground')}
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={cn('font-medium break-words', tone === 'dark' ? 'text-white' : 'text-primary')}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      'underline-offset-4 hover:underline',
                      tone === 'dark' ? 'text-white/75 hover:text-white' : 'text-muted-foreground hover:text-primary'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
