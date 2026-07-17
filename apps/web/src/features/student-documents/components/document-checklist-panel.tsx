'use client';

import { useCallback, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UPLOAD_CONFIG } from '@mge/config';
import { CheckCircle2, Clock3, ExternalLink, FileUp, Loader2, Upload, X } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { getAccessToken } from '@/lib/auth';
import { resolveDocumentType } from '@/lib/document-upload';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeItem, setActiveItem] = useState<{ key: string; label: string } | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [rowError, setRowError] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  const uploadFile = useCallback(
    async (file: File, itemKey: string, itemLabel: string) => {
      const accessToken = getAccessToken() || token;
      if (!accessToken) {
        throw new Error('Session expired. Please sign in again.');
      }

      const body = new FormData();
      body.append('file', file);
      body.append('name', itemLabel);
      body.append('type', resolveDocumentType(itemKey));
      body.append('checklistItemKey', itemKey);

      const res = await fetch(`${API_URL}/students/documents/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      return data;
    },
    [token]
  );

  const openUploadFor = (item: ChecklistItem) => {
    setActiveItem({ key: item.key, label: item.label });
    setModalError('');
    setModalSuccess('');
    setModalOpen(true);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (file: File | undefined, itemKey: string, itemLabel: string) => {
    if (!file) return;

    setUploadingKey(itemKey);
    setRowError((prev) => ({ ...prev, [itemKey]: '' }));
    setModalError('');

    try {
      await uploadFile(file, itemKey, itemLabel);
      setModalSuccess('Document uploaded successfully. Your counselor will verify it shortly.');
      setModalOpen(false);
      setActiveItem(null);
      onUploaded();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed.';
      setRowError((prev) => ({ ...prev, [itemKey]: message }));
      setModalError(message);
    } finally {
      setUploadingKey(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const maxLabel = typeof window !== 'undefined' && window.location.hostname.includes('vercel')
    ? '4 MB'
    : UPLOAD_CONFIG.maxFileSizeLabel;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (activeItem) {
            handleFileSelected(file, activeItem.key, activeItem.label);
          }
        }}
      />

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
                  const isUploading = uploadingKey === item.key;

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
                                  href={
                                    item.latestUpload.url.startsWith('/api/')
                                      ? `${item.latestUpload.url}?token=${encodeURIComponent(getAccessToken() || token)}`
                                      : item.latestUpload.url
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-accent hover:underline"
                                >
                                  View <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                            {rowError[item.key] && (
                              <p className="mt-2 text-xs text-red-600">{rowError[item.key]}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant={item.status === 'pending' ? 'accent' : 'outline'}
                        size="sm"
                        className="shrink-0"
                        disabled={isUploading}
                        onClick={() => openUploadFor(item)}
                      >
                        {isUploading ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
                        ) : (
                          <><Upload className="h-4 w-4" /> {item.status === 'pending' ? 'Upload' : 'Replace'}</>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {modalOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close upload dialog"
            onClick={() => {
              if (!uploadingKey) {
                setModalOpen(false);
                setActiveItem(null);
              }
            }}
          />
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-premium-xl">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">Upload Document</h3>
                <p className="text-sm text-muted-foreground mt-1">{activeItem.label}</p>
              </div>
              <button
                type="button"
                className="text-muted-foreground hover:text-primary"
                onClick={() => {
                  if (!uploadingKey) {
                    setModalOpen(false);
                    setActiveItem(null);
                  }
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Accepted: {UPLOAD_CONFIG.allowedExtensions.join(', ')} · Max {maxLabel}
            </p>

            {modalError && <p className="mb-3 text-sm text-red-600">{modalError}</p>}
            {modalSuccess && <p className="mb-3 text-sm text-emerald-700">{modalSuccess}</p>}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="accent"
                disabled={!!uploadingKey}
                onClick={triggerFilePicker}
              >
                {uploadingKey ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
                ) : (
                  <><Upload className="h-4 w-4" /> Choose File & Upload</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!!uploadingKey}
                onClick={() => {
                  setModalOpen(false);
                  setActiveItem(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
