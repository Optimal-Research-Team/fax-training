import type { Guardrail } from './types';

export const GUARDRAILS: Guardrail[] = [
  {
    id: 'ecg-is-lab',
    title: 'ECG and Holter → Lab, not Imaging or Radiology',
    rule: 'ECG reports, Holter monitoring, and ambulatory BP (ABPM) outputs are always Lab — even if they arrive on cardiology clinic letterhead (e.g., PACE cardiology). The procedure name does not determine the category.',
  },
  {
    id: 'pharmacy-is-prescription',
    title: 'Pharmacy faxes → Prescription, not Others',
    rule: 'Any renewal or refill request from Shoppers Drug Mart or any pharmacy is Prescription. This includes requests for clarification on a prescription you previously sent.',
  },
  {
    id: 'radiology-vs-imaging',
    title: 'Radiology vs. Imaging — always check who signed',
    rule: 'A cardiac MRI signed by a radiologist is Radiology. The same scan signed by a cardiologist is Imaging. The procedure name is irrelevant. If the signing provider’s specialty cannot be determined, default to Radiology.',
  },
  {
    id: 'referral-is-consult',
    title: 'Referral-workflow faxes → Consult (there is no Referral category)',
    rule: 'Avaros has no “Referral” category — that label only exists inside the AI fax sorter. Appointment confirmations, unable-to-reach notices, requests for more info, and declined consult referrals from specialists you referred to are all filed as Consult. (Returned diagnostic/lab requisitions still go by their service — see the returned-requisition rule.)',
  },
  {
    id: 'mychart-is-oldchart',
    title: 'MyChart / patient portal exports → Oldchart',
    rule: 'Conversation logs, message threads, and exported portal letters are historical records. Classify as Oldchart, not Others.',
  },
  {
    id: 'returned-req-by-service',
    title: 'Returned requisitions → classify by the service',
    rule: "A mammography req returned 'patient no-show' → Radiology. A cardiology consult form returned 'declined' → Consult. A lab req marked 'cancelled' → Lab. Use the category of the service on the form.",
  },
  {
    id: 'junk-not-catchall',
    title: 'Junk is not a catch-all',
    rule: 'Only use Junk for blank pages, test faxes, garbled/unreadable OCR, or pure advertisements. If the fax has readable admin content (a fee schedule, an invoice) with no clinical value, use Others.',
  },
  {
    id: 'lu-codes-are-rx',
    title: 'LU codes → Prescription, not Insurance',
    rule: 'LU (Limited Use) codes are added directly to a prescription and are part of the prescribing act. Trillium SA and private insurer prior auth forms are Insurance.',
  },
  {
    id: 'consent-transfer-vs-onboarding',
    title: 'Consent forms — records transfer vs. new patient onboarding',
    rule: 'A consent form attached to a chart bundle, records transfer, or PHIPA release request → Oldchart. A standalone new-patient onboarding consent with no records-transfer intent → Legal.',
  },
  {
    id: 'old-chart-bundle-takes-over',
    title: 'Old chart bundles → Oldchart even if they contain consult/lab items',
    rule: 'If a document is a mixture of historical records from multiple providers and dates, classify the entire bundle as Oldchart — even if individual items within it would otherwise be Consult, Lab, or Radiology.',
  },
];

export const GUARDRAIL_MAP: Record<string, Guardrail> = Object.fromEntries(
  GUARDRAILS.map((g) => [g.id, g]),
);
