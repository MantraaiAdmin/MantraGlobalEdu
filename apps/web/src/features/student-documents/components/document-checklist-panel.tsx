'use client';

import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MGE_DOCUMENT_CHECKLIST,
} from '@mge/config';
import { CheckCircle2, Clock3, ExternalLink, FileUp, Loader2, Upload } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { UPLOAD_CONFIG } from '@mge/config';

type ChecklistItem = {
  key: string;
  number: number;
  label: string;
  category: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'verified';
  latestUpload: {
    id: string;
    name: string;
    url: string;
    uploadedAt: string;
  } | null;
};

type CategoryGroup = {
  category: string;
  label: string;
  items: ChecklistItem[];
};

const STATUS_META = {
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800', icon: Clock3 },
  uploaded: { label: 'Uploaded', className: 'bg-blue-100 text-blue-800', icon: FileUp },
  verified: { label: 'Verified', className: 'bg-emerald-100 text-emerald-800', icon: CheckCircle2 },
} as const;

export function DocumentChecklistPanel({
  byCategory,
  token,
  onUploaded,
}: {
  byCategory: CategoryGroup[];
  token: string;
  onUploaded: () => void;
}) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState('');

  const activeItem = MGE_DOCUMENT_CHECKLIST.find((i) => i.key === activeKey);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !activeKey || !activeItem) return;

    if (file.size > UPLOAD_CONFIG.maxFileSize) {
      setError(`File exceeds maximum size of ${UPLOAD_CONFIG.maxFileSizeLabel}.`);
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const body = new FormData();
    body.append('file', file);
    body.append('name', displayName || activeItem.label);
    body.append('type', activeKey.includes('lor') ? 'lor' : activeKey.includes('passport') ? 'passport' : 'other');
    body.append('checklistItemKey', activeKey);

    try {
      const res = await fetch(`${API_URL}/students/documents/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setSuccess('Document uploaded successfully. Your counselor will verify it shortly.');
      setActiveKey(null);
      setDisplayName('');
      if (fileRef.current) fileRef.current.value = '';
      onUploaded();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {byCategory.map((group) => (
        <Card key={group.category} className="premium-card overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
            <CardTitle className="text-base">{group.label}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {group.items.map((item) => {
                const meta = STATUS_META[item.status];
                const Icon = meta.icon;
                return (
                  <div key={item.key} className="p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {item.number}
                        </span>
                        <div>
                          <p className="font-medium text-primary">{item.label}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}>
                              <Icon className="h-3.5 w-3.5" /> {meta.label}
                            </span>
                            {!item.required && (
                              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                                Optional
                              </span>
                            )}
                          </div>
                          {item.latestUpload && (
                            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                              <span>{item.latestUpload.name}</span>
                              <a
                                href={item.latestUpload.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-accent hover:underline"
                              >
                                View <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant={item.status === 'pending' ? 'accent' : 'outline'}
                      size="sm"
                      className="shrink-0"
                      onClick={() => {
                        setActiveKey(item.key);
                        setDisplayName(item.label);
                        setError('');
                        setSuccess('');
                      }}
                    >
                      <Upload className="h-4 w-4" />
                      {item.status === 'pending' ? 'Upload' : 'Replace'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {activeKey && activeItem && (
        <Card className="premium-card border-accent/30">
          <CardHeader>
            <CardTitle className="text-base">Upload: {activeItem.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Document display name"
              />
              <Input
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                required
              />
              <p className="text-xs text-muted-foreground">
                Accepted: {UPLOAD_CONFIG.allowedExtensions.join(', ')} · Max {UPLOAD_CONFIG.maxFileSizeLabel}
              </p>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-emerald-700">{success}</p>}
              <div className="flex gap-2">
                <Button type="submit" disabled={uploading}>
                  {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</> : 'Submit Document'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setActiveKey(null)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
