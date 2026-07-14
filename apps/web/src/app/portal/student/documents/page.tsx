'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, CheckCircle2, Loader2, Upload, Info, ExternalLink } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';
import { fetchStudentDocuments } from '@/services/api.service';
import { formatDate } from '@mge/utils';
import { APP_CONFIG, UPLOAD_CONFIG, API_CONFIG } from '@mge/config';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(API_CONFIG.prefix, '') || 'http://localhost:4000';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function StudentDocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: '', type: 'transcript' });
  const [documents, setDocuments] = useState<Array<{
    id: string;
    name: string;
    type: string;
    isVerified: boolean;
    uploadedAt: string;
    url: string;
    mimeType: string;
    size: number;
  }>>([]);

  const loadDocuments = () => {
    const token = getAccessToken();
    if (!token) return;
    fetchStudentDocuments(token)
      .then(setDocuments)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    const token = getAccessToken();
    if (!file || !token) {
      setError('Please select a file to upload.');
      return;
    }
    if (file.size > UPLOAD_CONFIG.maxFileSize) {
      setError(`File exceeds maximum size of ${UPLOAD_CONFIG.maxFileSizeLabel}.`);
      return;
    }
    if (!UPLOAD_CONFIG.allowedMimeTypes.includes(file.type as typeof UPLOAD_CONFIG.allowedMimeTypes[number])) {
      setError(`Invalid file type. Accepted formats: ${UPLOAD_CONFIG.allowedExtensions.join(', ')}`);
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const body = new FormData();
    body.append('file', file);
    body.append('name', form.name || file.name);
    body.append('type', form.type);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/students/documents/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setSuccess('Document uploaded successfully. Your counselor will review it shortly.');
      setForm({ name: '', type: 'transcript' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      loadDocuments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-primary mb-2">Documents</h2>
      <p className="text-muted-foreground mb-6">Upload transcripts, SOPs, test scores, and other application documents.</p>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-primary flex items-center gap-2">
            <Upload className="h-5 w-5" /> Upload Document
          </h3>

          <div className="mt-4 rounded-xl bg-muted/50 border border-border p-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p><strong className="text-primary">Accepted formats:</strong> {UPLOAD_CONFIG.allowedExtensions.join(', ')}</p>
                <p className="mt-1"><strong className="text-primary">Maximum file size:</strong> {UPLOAD_CONFIG.maxFileSizeLabel}</p>
                <p className="mt-1">Documents are reviewed by your {APP_CONFIG.shortName} counselor. Verified files show a green badge.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpload} className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium">Document Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                required
              >
                {UPLOAD_CONFIG.documentTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Display Name (optional)</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. 12th Grade Mark Sheet"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Select File *</label>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                className="mt-1"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-success">{success}</p>}
            <Button type="submit" disabled={uploading} className="gap-2">
              {uploading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="h-4 w-4" /> Upload Document</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h3 className="font-semibold text-primary mb-4">Uploaded Documents ({documents.length})</h3>
      {documents.length === 0 ? (
        <p className="text-muted-foreground text-sm">No documents uploaded yet.</p>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-primary truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {doc.type.replace(/_/g, ' ')} · {formatDate(doc.uploadedAt)}
                      {doc.size ? ` · ${formatFileSize(doc.size)}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {doc.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs text-success font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                    </span>
                  )}
                  <a
                    href={`${API_BASE}${doc.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline inline-flex items-center gap-1"
                  >
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
