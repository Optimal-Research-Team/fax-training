import type { PriorityRules } from './types';

export const PRIORITY: PriorityRules = {
  global: {
    principle:
      'When in doubt, prefer abnormal over normal — a false positive is far less harmful than a false negative.',
    constraint:
      'However, do NOT mark abnormal unless OCR explicitly contains abnormal/critical language, out-of-range/flagged results, or an urgent action request.',
    rules: [
      'If document is largely unreadable or illegible → abnormal',
      'If document is empty, clearly junk, or an advertisement → normal',
      'Never fabricate findings. Only use information explicitly present in OCR.',
    ],
  },
  perCategory: {
    Lab: {
      abnormalIfAny: [
        'H / L / HH / LL / A / C flag',
        'Value outside reference range (even if not flagged)',
        'Potassium >6.0 or <3.0',
        'Sodium <120 or >160',
        'Glucose <3.0',
        'Hemoglobin <70',
        'INR >5.0',
        'Positive troponin',
        'Platelets <50 or >1000',
        'WBC <2.0 or >30',
        'Significantly elevated creatinine',
        'Positive cultures with pathogenic organisms',
        'Positive STI / hepatitis / HIV screens',
        'Cancer markers significantly above normal',
        'eGFR <60 (especially new or declining)',
        'HbA1c >7.0% (or >6.5% if not previously diagnosed)',
        'TSH significantly outside range',
        'Liver enzymes >2× ULN',
        'Any lab comment recommending follow-up',
      ],
      normalIf:
        'All values within reference range, no flags, minor clinically insignificant deviations, stable monitoring.',
    },
    Consult: {
      abnormalIfAny: [
        'New diagnosis (especially serious: cancer, autoimmune, cardiac, neurological)',
        'Recommends urgent follow-up / expedited testing / emergency intervention',
        'Surgery or procedure recommended',
        'Medication change (esp. anticoagulants, immunosuppressants, chemotherapy, opioids)',
        'Specialist asks physician to take specific action',
        'Abnormal imaging or biopsy results included',
        "Concerning language: 'worrisome', 'suspicious', 'malignant', 'cannot rule out'",
        'Patient seen in ER or admitted',
        'Specialist discharging patient back with new management plan',
      ],
      normalIf:
        "Reassuring findings, no new diagnosis, 'no significant abnormalities', routine follow-up, stable chronic condition.",
    },
    Radiology: {
      abnormalIfAny: [
        "Impression contains: 'abnormal', 'suspicious', 'malignant', 'concerning', 'cannot exclude', 'further investigation recommended', 'clinical correlation recommended', 'follow-up recommended'",
        'Any mass, nodule, lesion, or tumor',
        'Fracture (new, or old if not previously documented)',
        'Pneumonia, effusion, edema, obstruction, aneurysm, dissection, embolism, infarction, hemorrhage, abscess, perforation',
        'Incidental findings needing follow-up (adrenal/thyroid nodule, renal cyst >3cm, lung nodule)',
        'BI-RADS ≥3',
        'Osteoporosis T-score ≤ -2.5, or significant osteopenia with fracture risk',
        'Recommendation for additional imaging or biopsy',
        'Progression or new findings vs prior',
      ],
      normalIf:
        "Impression explicitly 'normal', 'unremarkable', 'no acute findings', 'negative'. Only age-appropriate degenerative changes. Stable findings. Expected post-surgical appearance.",
    },
    Imaging: {
      abnormalIfAny: [
        'Same as Radiology — plus: acute ischemia, infarction, significant arrhythmia, markedly reduced cardiac function, severe valve disease, device concerns, prompt follow-up recommended',
      ],
      normalIf: 'Same as Radiology.',
    },
    Pathology: {
      abnormalIfAny: [
        'Malignancy, carcinoma, sarcoma, lymphoma, melanoma',
        'Dysplasia (moderate, severe, high-grade)',
        'Carcinoma in situ',
        'Atypical cells',
        'Neoplasm',
        'Pap smear: ASC-US, ASC-H, LSIL, HSIL, AGC, or any non-NILM',
        'HPV positive (especially 16, 18)',
        'Inflammation with atypia',
        'Unexpected findings',
        'Infection (e.g., H. pylori)',
        'Positive or close margins',
        'Recommendation for re-excision or additional sampling',
        'Immunohistochemistry / molecular markers suggesting aggressive disease',
      ],
      normalIf:
        "Pap NILM with negative HPV. Biopsy benign, no atypia/dysplasia. Excision with clear margins. 'No malignancy identified'.",
    },
    Prescription: {
      abnormalIfAny: [
        'Controlled substance renewal (opioids, benzodiazepines, stimulants, medical cannabis)',
        'Pharmacy flagging drug interaction, allergy, duplicate therapy, contraindication',
        'Patient not picking up critical medication',
        'Request for medication physician may not have prescribed',
        'Patient out of critical medication (insulin, anticoagulant, antiepileptic, immunosuppressant)',
        'Pharmacy requesting prescription clarification',
        'Medication requiring monitoring (warfarin, lithium, methotrexate)',
        'Patient not seen in clinic for extended period but requesting renewals',
      ],
      normalIf:
        'Routine renewal for non-controlled, non-critical maintenance medication for an active patient. Prescription transfer notification. Confirmation of fill.',
    },
    Insurance: {
      abnormalIfAny: [
        'Form has a deadline (especially within 2 weeks)',
        'Request for physician to complete a medical form',
        'Denial of prior auth requiring physician appeal',
        'Request for additional medical information',
        'IME request',
        'WSIB documentation required',
        'DTC certificate (T2201) request',
      ],
      normalIf:
        'Confirmation of coverage / benefits summary. Completed/processed claim with no further action. General correspondence not requiring physician input.',
    },
    Legal: {
      abnormalIfAny: ['Flag ALL legal documents unless clearly spam'],
      normalIf:
        'Spam or junk from legal marketing. General legal newsletter or advertisement.',
    },
    Oldchart: {
      abnormalIfAny: [
        'Active or recent serious conditions (cancer, HIV, hepatitis, significant cardiac/respiratory/neurological)',
        'Current medications requiring monitoring (warfarin, lithium, methotrexate, immunosuppressants, opioids, insulin)',
        'History of serious allergies (anaphylaxis, Stevens-Johnson)',
        'Recent hospitalizations or surgeries',
        'Outstanding follow-up items',
        'Active mental health safety concerns or recent psychiatric admissions',
        'Active substance use treatment',
        'Possible current pregnancy',
        'Abnormal results that appear unacted-on',
        'Pediatric immunization gaps',
      ],
      normalIf:
        'Generally healthy patient, all historical issues well-documented and managed, no outstanding follow-up, records >10 years old with no ongoing relevance.',
    },
    Referral: {
      abnormalIfAny: [
        'Urgent clinical concerns, time-sensitive language, or serious suspected diagnoses requiring prompt physician review',
        'Incomplete referral missing necessary supporting documents where follow-up is needed',
        'Appointment notification where the patient no-showed or did not attend',
        'Appointment could not be booked for any reason (including declined / returned referrals)',
        'Patient cancelled the appointment',
        'Patient could not be reached by the specialist office',
      ],
      normalIf:
        'Straightforward routine referral with no urgency signals; routine appointment confirmation or scheduling notification with no negative status.',
    },
    Photo: {
      abnormalIfAny: [
        'Note describes a rapidly changing lesion, bleeding, ulceration, asymmetry, irregular borders, colour variation, diameter >6mm, or evolving characteristics',
        'Cover letter expresses concern — “rule out malignancy”, “suspicious”, “biopsy recommended”',
        'Signs of infection, burns, wounds, or trauma',
        'Image quality too poor to assess, with little or no context (err on the side of caution)',
      ],
      normalIf:
        'Routine documentation of a known benign condition; pre/post-treatment photos showing expected progress; documentation only with no clinical concern.',
    },
    Others: {
      abnormalIfAny: [
        'Acute or serious clinical information',
        'Patient complaint requiring response',
        'Provider requesting urgent action',
        'Time-sensitive information (referral acceptances, wait-list)',
        'Notification from hospital, LTC, or public health unit',
        'Reportable disease notification',
        'Death notification',
        'Pharmacy drug interaction or allergy alert',
        'Misclassified document that actually belongs in another category AND contains abnormal findings',
      ],
      normalIf:
        'Clearly junk/spam, routine notification with no action required, informational correspondence with no clinical relevance, duplicate.',
    },
    Junk: {
      rule: 'Always normal.',
    },
  },
};
