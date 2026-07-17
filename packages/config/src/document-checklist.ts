/** MGE-DOC-02 — Application & Visa Document Checklist */
export const DOCUMENT_CHECKLIST_CATEGORIES = {
  identity: 'Identity & Personal',
  academic: 'Academic Records',
  application: 'Application Documents',
  financial: 'Financial Documents',
  visa: 'Visa & Pre-Departure',
} as const;

export type DocumentChecklistCategory = keyof typeof DOCUMENT_CHECKLIST_CATEGORIES;

export const MGE_DOCUMENT_CHECKLIST = [
  { key: 'passport', number: 1, label: 'Valid Passport (minimum 6 months validity)', category: 'identity' as const, required: true },
  { key: 'passport_photos', number: 2, label: 'Passport-size Photographs (as per specification)', category: 'identity' as const, required: true },
  { key: '10th_certificate', number: 3, label: '10th Standard Marksheet & Certificate', category: 'academic' as const, required: true },
  { key: '12th_certificate', number: 4, label: '12th Standard Marksheet & Certificate', category: 'academic' as const, required: true },
  { key: 'bachelors_degree', number: 5, label: "Bachelor's Degree Marksheets & Certificate", category: 'academic' as const, required: false },
  { key: 'masters_degree', number: 6, label: "Master's Degree Marksheets & Certificate (if applicable)", category: 'academic' as const, required: false },
  { key: 'transcript', number: 7, label: 'Transcript', category: 'academic' as const, required: true },
  { key: 'english_test', number: 8, label: 'English Proficiency Test Score Report (IELTS / TOEFL / PTE)', category: 'academic' as const, required: true },
  { key: 'sop', number: 9, label: 'Statement of Purpose (SOP)', category: 'application' as const, required: true },
  { key: 'lor_academic', number: 10, label: 'Letters of Recommendation (LOR) — Academic', category: 'application' as const, required: true },
  { key: 'lor_professional', number: 11, label: 'Letters of Recommendation (LOR) — Professional', category: 'application' as const, required: false },
  { key: 'resume', number: 12, label: 'Updated Resume / CV', category: 'application' as const, required: true },
  { key: 'work_experience', number: 13, label: 'Work Experience Letters (if applicable)', category: 'application' as const, required: false },
  { key: 'bank_statements', number: 14, label: 'Bank Statements (last 6 months)', category: 'financial' as const, required: true },
  { key: 'sponsor_affidavit', number: 15, label: 'Sponsor / Affidavit of Financial Support', category: 'financial' as const, required: true },
  { key: 'education_loan', number: 16, label: 'Education Loan Sanction Letter (if applicable)', category: 'financial' as const, required: false },
  { key: 'birth_certificate', number: 17, label: 'Birth Certificate', category: 'identity' as const, required: true },
  { key: 'address_proof', number: 18, label: 'Address Proof', category: 'identity' as const, required: true },
  { key: 'offer_letter', number: 19, label: 'University Offer Letter', category: 'visa' as const, required: true },
  { key: 'visa_application', number: 20, label: 'Visa Application Form', category: 'visa' as const, required: true },
  { key: 'medical_certificate', number: 21, label: 'Medical Examination / Health Certificate', category: 'visa' as const, required: true },
  { key: 'travel_insurance', number: 22, label: 'Travel & Health Insurance', category: 'visa' as const, required: true },
] as const;

export type DocumentChecklistItemKey = (typeof MGE_DOCUMENT_CHECKLIST)[number]['key'];

export type DocumentChecklistItemStatus = 'pending' | 'uploaded' | 'verified';

export const VISA_STATUS_LABELS = {
  NOT_STARTED: 'Not Started',
  DOCUMENTS_PREPARING: 'Documents Preparing',
  APPLIED: 'Visa Applied',
  BIOMETRICS: 'Biometrics Completed',
  INTERVIEW_SCHEDULED: 'Interview Scheduled',
  APPROVED: 'Visa Approved',
  REJECTED: 'Visa Rejected',
} as const;

export const APPLICATION_STATUS_LABELS = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  DOCUMENTS_PENDING: 'Documents Pending',
  OFFER_RECEIVED: 'Offer Received',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
} as const;

export function buildChecklistProgress(
  documents: Array<{
    id: string;
    name: string;
    checklistItemKey?: string | null;
    isVerified: boolean;
    uploadedAt: string | Date;
    url: string;
    mimeType?: string;
    size?: number;
  }>
) {
  const byKey = new Map<string, typeof documents>();
  for (const doc of documents) {
    if (!doc.checklistItemKey) continue;
    const list = byKey.get(doc.checklistItemKey) || [];
    list.push(doc);
    byKey.set(doc.checklistItemKey, list);
  }

  const items = MGE_DOCUMENT_CHECKLIST.map((item) => {
    const uploads = (byKey.get(item.key) || []).sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    const latest = uploads.find((u) => u.isVerified) || uploads[0];
    let status: DocumentChecklistItemStatus = 'pending';
    if (latest) {
      status = latest.isVerified ? 'verified' : 'uploaded';
    }

    return {
      ...item,
      status,
      uploads,
      latestUpload: latest || null,
    };
  });

  const summary = {
    total: items.length,
    required: items.filter((i) => i.required).length,
    pending: items.filter((i) => i.status === 'pending').length,
    uploaded: items.filter((i) => i.status === 'uploaded').length,
    verified: items.filter((i) => i.status === 'verified').length,
    completionPercent: Math.round(
      (items.filter((i) => i.status !== 'pending').length / items.length) * 100
    ),
  };

  const byCategory = Object.keys(DOCUMENT_CHECKLIST_CATEGORIES).map((category) => ({
    category: category as DocumentChecklistCategory,
    label: DOCUMENT_CHECKLIST_CATEGORIES[category as DocumentChecklistCategory],
    items: items.filter((i) => i.category === category),
  }));

  return { items, summary, byCategory };
}
