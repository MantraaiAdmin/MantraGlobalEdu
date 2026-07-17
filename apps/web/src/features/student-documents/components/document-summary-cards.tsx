'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock3, FileUp, FolderOpen } from 'lucide-react';

type Summary = {
  total: number;
  required: number;
  pending: number;
  uploaded: number;
  verified: number;
  completionPercent: number;
};

export function DocumentSummaryCards({ summary }: { summary: Summary }) {
  const cards = [
    {
      label: 'Total Checklist Items',
      value: summary.total,
      sub: `${summary.required} required`,
      icon: FolderOpen,
      tone: 'text-primary bg-primary/10',
    },
    {
      label: 'Pending Upload',
      value: summary.pending,
      sub: 'Not yet uploaded',
      icon: Clock3,
      tone: 'text-amber-700 bg-amber-100',
    },
    {
      label: 'Awaiting Verification',
      value: summary.uploaded,
      sub: 'Uploaded, under review',
      icon: FileUp,
      tone: 'text-blue-700 bg-blue-100',
    },
    {
      label: 'Verified',
      value: summary.verified,
      sub: `${summary.completionPercent}% complete`,
      icon: CheckCircle2,
      tone: 'text-emerald-700 bg-emerald-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="premium-card">
          <CardContent className="p-5 flex items-start gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{card.value}</div>
              <div className="text-sm font-medium text-primary/80">{card.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{card.sub}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
