'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';
import { fetchStudentDocumentWorkspace } from '@/services/api.service';
import { DocumentSummaryCards } from '@/features/student-documents/components/document-summary-cards';
import { ApplicationJourneyPanel } from '@/features/student-documents/components/application-journey-panel';
import { DocumentChecklistPanel } from '@/features/student-documents/components/document-checklist-panel';

export default function StudentDocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState<Awaited<ReturnType<typeof fetchStudentDocumentWorkspace>> | null>(null);

  const loadWorkspace = () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    fetchStudentDocumentWorkspace(token)
      .then(setWorkspace)
      .catch(() => setWorkspace(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadWorkspace();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!workspace) {
    return <p className="text-muted-foreground">Unable to load document workspace. Please sign in again.</p>;
  }

  const token = getAccessToken() || '';

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-primary">Document Checklist</h2>
        <p className="text-muted-foreground mt-1">
          MGE-DOC-02 master checklist for application and visa documentation. Track uploads, verification, and application progress in one place.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Student: {workspace.student.profile.firstName} {workspace.student.profile.lastName} · Reg. {workspace.student.registrationNo}
        </p>
      </div>

      <DocumentSummaryCards summary={workspace.summary} />

      <ApplicationJourneyPanel
        preferredCountries={workspace.student.preferredCountries}
        appliedCountries={workspace.student.appliedCountries}
        applications={workspace.applications}
      />

      <DocumentChecklistPanel
        byCategory={workspace.checklist.byCategory}
        token={token}
        onUploaded={loadWorkspace}
      />
    </div>
  );
}
