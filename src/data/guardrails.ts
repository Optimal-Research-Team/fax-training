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
    id: 'imaging-centre-is-radiology',
    title: 'Diagnostic-imaging centres → Radiology by default',
    rule: 'Anything from a DI centre / hospital radiology service (e.g., WELL Health Diagnostic Centre, Georgian Radiology) is Radiology — report, appointment notification, returned requisition, or cover letter — unless it is clearly interpreted by a non-radiologist specialist. The TSI sender is often the radiologist’s name, so read the letterhead and report headers, not just the sender line.',
  },
  {
    id: 'referral-strict',
    title: "Referral ≠ just seeing the word 'referral'",
    rule: 'Only use Referral for genuine specialist referral workflow: appointment notifications/confirmations, unable-to-reach notices, requests for more info to complete a referral, or declined/returned referrals. Demographics, fax headers, or “referral” in a subject line alone do not qualify — if it is a general clinic/admin notice, use Others.',
  },
  {
    id: 'returned-req-by-service',
    title: 'Returned requisition vs. rejection letter',
    rule: "A requisition/form returned with a status stamp (no-show, cancelled, declined, returned) → classify by the SERVICE on the form: mammography req → Radiology, cardiology consult req → Consult, lab req → Lab. BUT a specialist's cover letter rejecting/declining a referral (often with the original referral appended) → Referral.",
  },
  {
    id: 'lu-codes-are-rx',
    title: 'LU codes → Prescription, not Insurance',
    rule: 'LU (Limited Use) codes are added directly to a prescription and are part of the prescribing act → Prescription. Trillium SA forms and private insurer prior-auth forms are Insurance.',
  },
  {
    id: 'questionnaires-are-others',
    title: 'Standalone questionnaires → Others',
    rule: 'Patient intake/screening/health-assessment questionnaires and symptom checklists that arrive on their own (not attached to a consult or referral) are Others — not Consult or Referral. If a questionnaire is bundled inside a consult or referral, classify by the parent document.',
  },
  {
    id: 'legal-active-counterparty',
    title: 'Legal needs an active external counterparty',
    rule: 'Legal is for subpoenas, court orders, lawyer record requests, CPSO, coroner, and IPC breach investigations — an outside party with legal standing requiring a response. Routine clinic legal instruments (new-patient consent, policy acknowledgments, PHIPA collection notices) have no counterparty → Others.',
  },
  {
    id: 'consent-transfer-vs-onboarding',
    title: 'Consent forms — records transfer vs. onboarding',
    rule: 'A consent / ROI / PHIPA-release form tied to a records transfer or chart copy → Oldchart. A standalone new-patient onboarding consent or policy acknowledgment with no records-transfer intent → Others (not Legal, not Oldchart).',
  },
  {
    id: 'mychart-is-oldchart',
    title: 'MyChart / patient portal exports → Oldchart',
    rule: 'Conversation logs, message threads, and exported portal letters are historical records. Classify as Oldchart, not Others.',
  },
  {
    id: 'old-chart-bundle-takes-over',
    title: 'Old-chart bundles → Oldchart even with consult/lab items',
    rule: 'If a document mixes historical records from multiple providers and dates, classify the whole bundle as Oldchart — even if individual items inside would otherwise be Consult, Lab, or Radiology.',
  },
  {
    id: 'junk-not-catchall',
    title: 'Junk is not a catch-all',
    rule: 'Only use Junk for blank pages, test faxes, garbled/unreadable OCR, or pure advertisements. If the fax has readable admin content (a fee schedule, an invoice) with no clinical value, use Others.',
  },
];

export const GUARDRAIL_MAP: Record<string, Guardrail> = Object.fromEntries(
  GUARDRAILS.map((g) => [g.id, g]),
);
