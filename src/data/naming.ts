import type { NamingRules } from './types';

export const NAMING: NamingRules = {
  formula: [
    'Prefix (subject/domain)',
    'Suffix 1 (document type)',
    'Suffix 2 (body region — radiology/imaging/pathology only)',
  ],
  prefixes: [
    'ECG',
    'Referral',
    'Holter Monitor',
    'Stress Test',
    'CT Scan',
    'MRI',
    'Nuclear Imaging',
    'Angiography',
    'Lab',
    'Bloodwork',
    'Discharge',
    'Consultation',
    'Insurance',
    'Medication',
  ],
  suffix1: ['Report', 'Form', 'List', 'Results', 'Summary', 'Note'],
  suffix2: [
    'Right leg',
    'Bilateral legs',
    'Head',
    'Skin',
    'Abdomen',
    'Chest',
    'Pelvis',
  ],
  specialRules: [
    {
      trigger: 'Returned / declined referral',
      rule: 'Description MUST explicitly include the rejection/return concept AND the specialty/clinic named.',
      example: 'Hematology — Referral rejection from RVH',
    },
    {
      trigger: 'Public health lab report',
      rule: 'Include the sender name.',
      example: 'Public Health — Lab report',
    },
    {
      trigger: 'Consent / authorization / release-of-information form',
      rule: "Extract the EXACT form title phrase as written. Do NOT summarize as 'Consent Form' or 'Release of Information'.",
      example: 'Consent to disclosure — Clinical record',
    },
    {
      trigger: 'Document has a labelled exam/study name',
      rule: 'Use that exact label (minus account/accession IDs) as the core phrase.',
      example: 'BMD Baseline Assessment',
    },
    {
      trigger: 'Procedure note from a specialist',
      rule: "Format as 'Procedure note — <specialty type>'.",
      example: 'Procedure note — Gastroenterology',
    },
    {
      trigger: 'Generic title (Fee Schedule, Patient Consent, Lab Report, etc.)',
      rule: 'Expand with specific purpose/context found in the document. Look for header lines, Purpose/Reason/Policy sections.',
      example: 'Fee schedule provided to patient during introductory meeting',
    },
    {
      trigger: 'Returned requisition with status annotation',
      rule: 'Format as "[Sender] [Service type] — [Annotation]". Classify by service category, NOT as Referral.',
      example: 'RVH Mammography — Patient no-showed appointment',
    },
    {
      trigger: 'Junk',
      rule: 'Set documentDescription to null.',
      example: null,
    },
  ],
};

/** Curated preset examples for the interactive naming builder. */
export type NamingPreset = {
  label: string;
  prefix: string;
  suffix1: string;
  suffix2?: string;
  note: string;
};

export const NAMING_PRESETS: NamingPreset[] = [
  {
    label: 'CBC bloodwork',
    prefix: 'Bloodwork',
    suffix1: 'Results',
    note: 'Lab result — no body region needed.',
  },
  {
    label: 'CT abdomen',
    prefix: 'CT Scan',
    suffix1: 'Report',
    suffix2: 'Abdomen',
    note: 'Radiology — Suffix 2 names the body region.',
  },
  {
    label: 'MRI head',
    prefix: 'MRI',
    suffix1: 'Report',
    suffix2: 'Head',
    note: 'Radiology — region is required for cross-sectional imaging.',
  },
  {
    label: 'ECG report',
    prefix: 'ECG',
    suffix1: 'Report',
    note: 'Lab (not Imaging) even on cardiology letterhead.',
  },
  {
    label: 'Cardiology consult',
    prefix: 'Consultation',
    suffix1: 'Report',
    note: 'Consult — no body region.',
  },
  {
    label: 'Trillium SA form',
    prefix: 'Insurance',
    suffix1: 'Form',
    note: 'Insurance — payer adjudication form, not a prescription.',
  },
];
