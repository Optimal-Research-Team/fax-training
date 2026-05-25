import type { TestFax } from './types';

export const FAXES: TestFax[] = [
  {
    id: 1,
    display: {
      sender: 'LifeLabs Barrie',
      pages: 2,
      snippet:
        'Patient: SMITH, JOHN  DOB: 1962-03-14\nCBC with differential. Hemoglobin 168 g/L. WBC 4.2. Platelets 245. Electrolytes within range. Creatinine 88. eGFR 84. All values within reference range.',
    },
    correctCategory: 'Lab',
    correctPriority: 'normal',
    suggestedDescription: 'Bloodwork Results — CBC and electrolytes',
    teachingNote:
      'Routine bloodwork with all values within reference range. No flags, no comments requesting follow-up → Normal.',
  },
  {
    id: 2,
    display: {
      sender: 'PACE Cardiology Clinic',
      pages: 1,
      snippet:
        '12-lead ECG performed 2026-04-12. Rate 72 bpm. Normal sinus rhythm. PR 168 ms. QRS 92 ms. No ST elevation or depression. No Q waves. Signed: Dr. P. Singh, FRCPC Cardiology.',
    },
    correctCategory: 'Lab',
    correctPriority: 'normal',
    suggestedDescription: 'ECG Report',
    teachingNote:
      'ECGs are always Lab — even on cardiology letterhead and signed by a cardiologist. The procedure name does not change the category.',
    guardrailId: 'ecg-is-lab',
  },
  {
    id: 3,
    display: {
      sender: 'PACE Cardiology Clinic',
      pages: 4,
      snippet:
        '24-hour Holter monitor. Total beats analyzed: 102,453. Average HR 78. Predominant rhythm: sinus. 142 PVCs, 18 PACs, no sustained arrhythmia. Signed: Dr. P. Singh, FRCPC Cardiology.',
    },
    correctCategory: 'Lab',
    correctPriority: 'normal',
    suggestedDescription: 'Holter Monitor Report',
    teachingNote:
      'Holter and ambulatory BP monitor outputs are Lab — not Imaging or Radiology. Use Imaging only for echo, MIBI, retinal imaging, etc., signed by a non-radiologist specialist.',
    guardrailId: 'ecg-is-lab',
  },
  {
    id: 4,
    display: {
      sender: 'LifeLabs Barrie',
      pages: 1,
      snippet:
        'Urinalysis. Leukocyte esterase POSITIVE. Nitrites POSITIVE. WBC 25-50 /hpf. Bacteria: many. Culture pending.',
    },
    correctCategory: 'Lab',
    correctPriority: 'abnormal',
    suggestedDescription: 'Urinalysis Results',
    teachingNote:
      'Positive nitrites and leukocyte esterase with bacteria suggest UTI — flag abnormal so the NP can prescribe.',
  },
  {
    id: 5,
    display: {
      sender: 'Dynacare',
      pages: 1,
      snippet:
        'HbA1c: 8.2% (H)  [Reference: 4.0–6.0%]\nFasting glucose: 9.4 mmol/L (H)\nFollow-up recommended.',
    },
    correctCategory: 'Lab',
    correctPriority: 'abnormal',
    suggestedDescription: 'Lab Results — HbA1c and fasting glucose',
    teachingNote:
      'HbA1c >7.0% is abnormal per the rules. Also flagged H, and the lab is recommending follow-up — multiple abnormal signals.',
  },
  {
    id: 6,
    display: {
      sender: 'Royal Victoria Cardiology',
      pages: 3,
      snippet:
        'Consultation Report. Patient seen for new dyspnea. Echo shows LVEF 35%. Diagnosis: HFrEF, new. Recommend starting ramipril 2.5 mg daily, follow up in 4 weeks. Signed: Dr. R. Patel, FRCPC Cardiology.',
    },
    correctCategory: 'Consult',
    correctPriority: 'abnormal',
    suggestedDescription: 'Cardiology Consultation Report',
    teachingNote:
      'New serious diagnosis (HFrEF) plus a medication change recommendation = abnormal. The specialist is asking you to act.',
  },
  {
    id: 7,
    display: {
      sender: 'Simcoe Dermatology',
      pages: 1,
      snippet:
        'Follow-up visit. Atopic dermatitis is well-controlled on current regimen. Continue topical tacrolimus PRN. Routine follow-up in 6 months.',
    },
    correctCategory: 'Consult',
    correctPriority: 'normal',
    suggestedDescription: 'Dermatology Follow-up Note',
    teachingNote:
      'Stable chronic condition, no new diagnosis or medication change, routine follow-up only → Normal.',
  },
  {
    id: 8,
    display: {
      sender: 'Innisfil GI Endoscopy',
      pages: 2,
      snippet:
        'Colonoscopy performed 2026-03-22. 1 sessile polyp in sigmoid colon, 6mm, removed via cold snare. Pathology pending. Repeat colonoscopy in 5 years if pathology benign.',
    },
    correctCategory: 'Consult',
    correctPriority: 'abnormal',
    suggestedDescription: 'Procedure note — Gastroenterology',
    teachingNote:
      "Procedure notes are Consult. Format the description as 'Procedure note — <specialty>'. Mark abnormal because a procedure was performed and pathology is pending.",
  },
  {
    id: 9,
    display: {
      sender: 'Northern Lights Psychotherapy',
      pages: 1,
      snippet:
        'Clinical note. Patient continues to make progress with CBT for GAD. Mood improved. Denies SI or HI. Continue weekly sessions. No medication changes recommended.',
    },
    correctCategory: 'Consult',
    correctPriority: 'normal',
    suggestedDescription: 'Psychotherapy Clinical Note',
    teachingNote:
      'Psychotherapy notes are Consult (allied health is included). No safety concerns, no action required → Normal.',
  },
  {
    id: 10,
    display: {
      sender: 'Royal Victoria Hospital — Discharge Summary',
      pages: 4,
      snippet:
        'Patient admitted 2026-04-01 for COPD exacerbation. Treated with IV methylprednisolone, nebulized salbutamol, azithromycin. Discharged 2026-04-05 on prednisone taper. Follow up with family MD in 1 week. Pulmonology referral made.',
    },
    correctCategory: 'Consult',
    correctPriority: 'abnormal',
    suggestedDescription: 'Discharge Summary — COPD exacerbation',
    teachingNote:
      'Discharge summaries are Consult. Recent hospital admission + new medication taper + follow-up requested = abnormal.',
  },
  {
    id: 11,
    display: {
      sender: 'WELL Health Diagnostic Imaging',
      pages: 2,
      snippet:
        'CT Chest with contrast. Indication: chronic cough. FINDINGS: 1.4 cm spiculated nodule in right upper lobe. IMPRESSION: Suspicious lung nodule. Recommend tissue biopsy. Signed: Dr. K. Mehta, MD FRCPC Diagnostic Radiology.',
    },
    correctCategory: 'Radiology',
    correctPriority: 'abnormal',
    suggestedDescription: 'CT Scan Report — Chest',
    teachingNote:
      'Signed by a radiologist (FRCPC Diagnostic Radiology) → Radiology. Suspicious nodule and biopsy recommended → clearly abnormal.',
  },
  {
    id: 12,
    display: {
      sender: 'Barrie Mammography Clinic',
      pages: 1,
      snippet:
        "Bilateral diagnostic mammography. IMPRESSION: Spiculated mass at 2 o'clock in right breast, 1.8 cm. BI-RADS 4. Biopsy recommended. Signed: Dr. L. Nguyen, FRCPC.",
    },
    correctCategory: 'Radiology',
    correctPriority: 'abnormal',
    suggestedDescription: 'Mammography Report — Bilateral breasts',
    teachingNote:
      'Radiologist-signed mammography → Radiology. BI-RADS 4 and biopsy recommended → abnormal.',
  },
  {
    id: 13,
    display: {
      sender: 'Barrie Bone Density Clinic',
      pages: 1,
      snippet:
        'DEXA scan. Lumbar spine T-score: -2.8. Femoral neck T-score: -2.6. IMPRESSION: Osteoporosis. Signed: Dr. S. Chau, FRCPC Diagnostic Radiology.',
    },
    correctCategory: 'Radiology',
    correctPriority: 'abnormal',
    suggestedDescription: 'DEXA Report — Bone density',
    teachingNote:
      'DEXA signed by radiologist → Radiology. T-score ≤ -2.5 = osteoporosis → abnormal per the priority rules.',
  },
  {
    id: 14,
    display: {
      sender: 'Barrie Ultrasound Centre',
      pages: 1,
      snippet:
        'Abdominal ultrasound. Liver, gallbladder, pancreas, spleen, kidneys all unremarkable. No free fluid. IMPRESSION: Normal abdominal ultrasound. Signed: Dr. A. Khan, FRCPC.',
    },
    correctCategory: 'Radiology',
    correctPriority: 'normal',
    suggestedDescription: 'Ultrasound Report — Abdomen',
    teachingNote:
      'Radiologist-signed → Radiology. Explicitly normal impression → Normal.',
  },
  {
    id: 15,
    display: {
      sender: 'Royal Victoria Hospital — Diagnostic Imaging',
      pages: 1,
      snippet:
        'CT Head without contrast. No acute intracranial hemorrhage. No mass effect. Age-appropriate degenerative changes. IMPRESSION: No acute findings. Signed: Dr. M. Singh, FRCPC.',
    },
    correctCategory: 'Radiology',
    correctPriority: 'normal',
    suggestedDescription: 'CT Scan Report — Head',
    teachingNote:
      "Radiologist-signed → Radiology. 'No acute findings' + age-appropriate changes → Normal.",
  },
  {
    id: 16,
    display: {
      sender: 'PACE Cardiology Clinic',
      pages: 3,
      snippet:
        'Transthoracic Echocardiogram. LVEF 60%. Normal LV size and wall thickness. Trace MR. No pericardial effusion. IMPRESSION: Normal echocardiogram. Signed: Dr. P. Singh, FRCPC Cardiology.',
    },
    correctCategory: 'Imaging',
    correctPriority: 'normal',
    suggestedDescription: 'Echocardiogram Report',
    teachingNote:
      'Echo signed by a cardiologist (NOT a radiologist) → Imaging. Normal impression → Normal.',
    guardrailId: 'radiology-vs-imaging',
  },
  {
    id: 17,
    display: {
      sender: 'Newmarket Cardiology',
      pages: 4,
      snippet:
        'Stress Echocardiogram. Bruce protocol, 6 min, achieved 8.4 METs. Inducible wall motion abnormality in the inferior wall at low workload. IMPRESSION: Inducible ischemia, low workload threshold. Cardiac catheterization recommended. Signed: Dr. R. Patel, FRCPC Cardiology.',
    },
    correctCategory: 'Imaging',
    correctPriority: 'abnormal',
    suggestedDescription: 'Stress Echocardiogram Report',
    teachingNote:
      'Cardiologist-signed → Imaging. Inducible ischemia + catheterization recommended → abnormal.',
  },
  {
    id: 18,
    display: {
      sender: 'Toronto Nuclear Cardiology',
      pages: 3,
      snippet:
        'Myocardial perfusion imaging (MIBI). Reversible defect in the anterior wall consistent with ischemia. LVEF 48%. IMPRESSION: Moderate reversible perfusion defect. Recommend cardiology follow-up. Signed: Dr. J. Chen, FRCPC Cardiology.',
    },
    correctCategory: 'Imaging',
    correctPriority: 'abnormal',
    suggestedDescription: 'Nuclear Imaging Report — MIBI',
    teachingNote:
      'Nuclear stress test signed by a cardiologist → Imaging (not Radiology). Reversible defect + follow-up recommended → abnormal.',
  },
  {
    id: 19,
    display: {
      sender: 'Barrie Eye Centre',
      pages: 2,
      snippet:
        'Dilated fundus examination with retinal imaging. Both eyes: mild non-proliferative diabetic retinopathy. Microaneurysms present. Recommend annual screening and tight glycemic control. Signed: Dr. T. Wong, MD FRCSC Ophthalmology.',
    },
    correctCategory: 'Imaging',
    correctPriority: 'abnormal',
    suggestedDescription: 'Retinal Imaging Report — Bilateral eyes',
    teachingNote:
      'Retinal imaging signed by ophthalmologist → Imaging. New finding of diabetic retinopathy → abnormal.',
  },
  {
    id: 20,
    display: {
      sender: 'Sunnybrook Pathology',
      pages: 2,
      snippet:
        'Skin biopsy, left forearm. DIAGNOSIS: Basal cell carcinoma, nodular type. Margins involved at deep edge. Recommend wide local excision.',
    },
    correctCategory: 'Pathology',
    correctPriority: 'abnormal',
    suggestedDescription: 'Pathology Report — Skin',
    teachingNote:
      'Tissue biopsy → Pathology. Malignancy (BCC) with positive margins → abnormal.',
  },
  {
    id: 21,
    display: {
      sender: 'LifeLabs Cytology',
      pages: 1,
      snippet:
        'Pap smear. Cellularity adequate. NILM (Negative for intraepithelial lesion or malignancy). HPV co-test: negative for high-risk HPV.',
    },
    correctCategory: 'Pathology',
    correctPriority: 'normal',
    suggestedDescription: 'Pathology Report — Pap smear',
    teachingNote: 'Pap NILM + negative HPV → the textbook normal result.',
  },
  {
    id: 22,
    display: {
      sender: 'LifeLabs Cytology',
      pages: 1,
      snippet:
        'Pap smear. ASC-US (Atypical squamous cells of undetermined significance). HPV co-test: POSITIVE for HPV-16. Recommend colposcopy referral.',
    },
    correctCategory: 'Pathology',
    correctPriority: 'abnormal',
    suggestedDescription: 'Pathology Report — Pap smear',
    teachingNote:
      'Any non-NILM Pap is abnormal. HPV-16 positive intensifies the urgency — colposcopy referral needed.',
  },
  {
    id: 23,
    display: {
      sender: 'Sunnybrook Pathology',
      pages: 1,
      snippet:
        'Colonic polyp, sigmoid colon. DIAGNOSIS: Hyperplastic polyp. No dysplasia. No malignancy identified.',
    },
    correctCategory: 'Pathology',
    correctPriority: 'normal',
    suggestedDescription: 'Pathology Report — Colon polyp',
    teachingNote: 'Benign hyperplastic polyp, no dysplasia → Normal.',
  },
  {
    id: 24,
    display: {
      sender: 'Royal Victoria Hospital Pathology',
      pages: 3,
      snippet:
        'Right breast core biopsy. DIAGNOSIS: Invasive ductal carcinoma, grade 2. ER+, PR+, HER2 equivocal. Recommend oncology referral.',
    },
    correctCategory: 'Pathology',
    correctPriority: 'abnormal',
    suggestedDescription: 'Pathology Report — Breast biopsy',
    teachingNote:
      'Invasive carcinoma diagnosis → abnormal. Oncology referral required.',
  },
  {
    id: 25,
    display: {
      sender: 'Shoppers Drug Mart #1184',
      pages: 1,
      snippet:
        'RENEWAL REQUEST. Patient: Smith, John. Medication: Metformin 500 mg BID. Last dispensed: 2025-12-14. Please authorize refill.',
    },
    correctCategory: 'Prescription',
    correctPriority: 'normal',
    suggestedDescription: 'Pharmacy Renewal Request — Metformin',
    teachingNote:
      'Pharmacy renewal requests are Prescription, never Others. Metformin is a routine, non-controlled medication for an active patient → Normal.',
    guardrailId: 'pharmacy-is-prescription',
  },
  {
    id: 26,
    display: {
      sender: 'Rexall Pharmacy',
      pages: 1,
      snippet:
        'RENEWAL REQUEST. Patient: Doe, Jane. Medication: Oxycodone 5 mg, 1 tab q6h PRN. Last fill: 2026-04-01. Quantity requested: 30 tablets.',
    },
    correctCategory: 'Prescription',
    correctPriority: 'abnormal',
    suggestedDescription: 'Pharmacy Renewal Request — Oxycodone',
    teachingNote:
      'Controlled substance renewals (opioids, benzos, stimulants) are always abnormal — require physician review.',
  },
  {
    id: 27,
    display: {
      sender: 'Shoppers Drug Mart #2210',
      pages: 1,
      snippet:
        'LU Code request. Patient: Brown, Alice. Medication: Esomeprazole 40 mg. Please complete LU code 392 for ODB coverage.',
    },
    correctCategory: 'Prescription',
    correctPriority: 'normal',
    suggestedDescription: 'LU Code Form — Esomeprazole',
    teachingNote:
      'LU codes are added directly to a prescription and are part of the prescribing act → Prescription, not Insurance. Non-controlled medication → Normal.',
    guardrailId: 'lu-codes-are-rx',
  },
  {
    id: 28,
    display: {
      sender: 'Costco Pharmacy',
      pages: 1,
      snippet:
        'CLARIFICATION REQUEST. Patient: Garcia, Maria. Recent rx for warfarin 5 mg daily. Patient reports last INR was 3.8 on 2026-04-10. Please confirm dose or adjust.',
    },
    correctCategory: 'Prescription',
    correctPriority: 'abnormal',
    suggestedDescription: 'Pharmacy Clarification Request — Warfarin',
    teachingNote:
      'Warfarin requires monitoring → abnormal regardless of the specific issue. Pharmacy is also actively requesting clarification.',
  },
  {
    id: 29,
    display: {
      sender: 'Trillium Drug Program — Special Authorization',
      pages: 4,
      snippet:
        'Special Authorization Request Form. Drug: tirzepatide. Patient: Williams, Susan. Section B requires physician completion: clinical indication, prior therapies tried, A1c history. Deadline: 14 days.',
    },
    correctCategory: 'Insurance',
    correctPriority: 'abnormal',
    suggestedDescription: 'Trillium SA Form — Tirzepatide',
    teachingNote:
      'Trillium SA is an adjudication form for a payer → Insurance (not Prescription). Physician must complete + has a deadline → abnormal.',
  },
  {
    id: 30,
    display: {
      sender: 'Manulife Financial',
      pages: 6,
      snippet:
        'Prior Authorization Request. Drug: dupilumab. Please complete attached form with diagnosis, ICD-10 code, prior therapies, and severity scores. Response required within 10 business days.',
    },
    correctCategory: 'Insurance',
    correctPriority: 'abnormal',
    suggestedDescription: 'Insurance Prior Authorization Form — Dupilumab',
    teachingNote:
      'Private insurer prior auth → Insurance. Form to complete with a deadline → abnormal.',
  },
  {
    id: 31,
    display: {
      sender: 'Canada Revenue Agency / Patient request',
      pages: 2,
      snippet:
        'DTC (T2201) Disability Tax Credit Certificate. Section B for medical practitioner to complete. Patient: Robertson, K. — describing severe and prolonged impairment in walking.',
    },
    correctCategory: 'Insurance',
    correctPriority: 'abnormal',
    suggestedDescription: 'DTC Certificate (T2201) Form',
    teachingNote:
      'Per the rules, DTC (T2201) is explicitly an Insurance form requiring physician completion → abnormal.',
  },
  {
    id: 32,
    display: {
      sender: 'Sun Life Financial',
      pages: 1,
      snippet:
        'Confirmation of Coverage. Patient: Thompson, R. Drug plan coverage has been renewed effective 2026-05-01. No action required.',
    },
    correctCategory: 'Insurance',
    correctPriority: 'normal',
    suggestedDescription: 'Insurance Coverage Confirmation Letter',
    teachingNote:
      'Confirmation of coverage with no physician action required → Normal.',
  },
  {
    id: 33,
    display: {
      sender: 'Toronto Cardiology Group',
      pages: 1,
      snippet:
        'APPOINTMENT CONFIRMATION. Patient Smith, John is scheduled with Dr. Patel on 2026-06-12 at 10:30 AM. Referral received and accepted.',
    },
    correctCategory: 'Referral',
    correctPriority: 'normal',
    suggestedDescription: 'Cardiology — Appointment confirmation',
    teachingNote:
      'Specialist confirming the appointment from a referral you sent → Referral. Routine confirmation → Normal.',
  },
  {
    id: 34,
    display: {
      sender: 'Mount Sinai Dermatology',
      pages: 1,
      snippet:
        'UNABLE TO REACH PATIENT. We have called 3 times over 2 weeks to schedule. Returning referral to source. Please ask patient to contact our office if they wish to rebook.',
    },
    correctCategory: 'Referral',
    correctPriority: 'normal',
    suggestedDescription: 'Dermatology — Unable to reach patient',
    teachingNote:
      'Unable-to-reach is a referral workflow notice → Referral. No urgent clinical content → Normal.',
  },
  {
    id: 35,
    display: {
      sender: 'Hematology — Royal Victoria Hospital',
      pages: 1,
      snippet:
        'DECLINED. The referral for Mr. K. does not meet our intake criteria as recent CBC and ferritin are missing. Please resubmit with required workup. Patient remains symptomatic per your note.',
    },
    correctCategory: 'Referral',
    correctPriority: 'abnormal',
    suggestedDescription: 'Hematology — Referral rejection from RVH',
    teachingNote:
      'Declined referral requiring action from us. Include the specialty and the rejection concept in the description. Mark abnormal because the patient is symptomatic and we need to act.',
  },
  {
    id: 36,
    display: {
      sender: 'Royal Victoria Hospital — Breast Imaging',
      pages: 1,
      snippet:
        'MAMMOGRAPHY REQUISITION RETURNED. Patient: Lee, S. Status: PATIENT NO-SHOW for appointment on 2026-04-08. No imaging performed.',
    },
    correctCategory: 'Radiology',
    correctPriority: 'normal',
    suggestedDescription: 'RVH Mammography — Patient no-showed appointment',
    teachingNote:
      "Returned requisition → classify by the SERVICE (mammography), not as Referral. Format the description as '[Sender] [Service] — [Annotation]'.",
    guardrailId: 'returned-req-by-service',
  },
  {
    id: 37,
    display: {
      sender: 'Smith Valeriote LLP — Personal Injury',
      pages: 3,
      snippet:
        'Re: Motor vehicle accident, our client Ms. J. We request a complete copy of her medical chart from 2024-01-01 to present. Signed authorization attached. Please respond within 30 days.',
    },
    correctCategory: 'Legal',
    correctPriority: 'abnormal',
    suggestedDescription: 'Legal — Records request from law firm',
    teachingNote:
      'Lawyer records request → Legal, always flagged abnormal (with rare spam-only exceptions).',
  },
  {
    id: 38,
    display: {
      sender: 'College of Physicians and Surgeons of Ontario',
      pages: 4,
      snippet:
        'Re: Complaint #2026-1184. The CPSO has received a complaint regarding care provided to patient [redacted]. You are required to respond in writing with a copy of your records and a narrative within 30 days.',
    },
    correctCategory: 'Legal',
    correctPriority: 'abnormal',
    suggestedDescription: 'Legal — CPSO complaint correspondence',
    teachingNote:
      'CPSO correspondence is Legal and always abnormal — strict deadline and reputational risk.',
  },
  {
    id: 39,
    display: {
      sender: 'Superior Court of Justice — Ontario',
      pages: 2,
      snippet:
        'SUBPOENA. You are required to produce the complete medical chart of [patient name] and to attend at court on 2026-07-22. Failure to comply may result in contempt.',
    },
    correctCategory: 'Legal',
    correctPriority: 'abnormal',
    suggestedDescription: 'Legal — Subpoena for medical records',
    teachingNote: 'Subpoena → Legal, abnormal. Strict legal deadline.',
  },
  {
    id: 40,
    display: {
      sender: 'Dr. Anderson Family Practice (previous physician)',
      pages: 47,
      snippet:
        'Transfer of records as requested. Patient: Khan, A. DOB 1958. Records span 2015–2025: chronic AFib on apixaban, prior MI 2019, recent hospitalization for CHF exacerbation. Multiple labs, imaging reports, and consult notes attached.',
    },
    correctCategory: 'Oldchart',
    correctPriority: 'abnormal',
    suggestedDescription: 'Old chart — Records from previous family physician',
    teachingNote:
      'Bundled historical records from another provider → Oldchart, even though individual items inside would be Lab/Consult/Radiology. Abnormal because the patient has active serious conditions (AFib + apixaban, prior MI, recent CHF admission).',
    guardrailId: 'old-chart-bundle-takes-over',
  },
  {
    id: 41,
    display: {
      sender: 'Sunnybrook Hospital — MyChart Export',
      pages: 6,
      snippet:
        'MyChart Conversation Log. Patient: Brown, C. Messages between patient and previous care team 2024-01 through 2025-12. Topics: medication refills, lab follow-up, appointment scheduling. No active issues noted.',
    },
    correctCategory: 'Oldchart',
    correctPriority: 'normal',
    suggestedDescription: 'MyChart Conversation Log — Sunnybrook',
    teachingNote:
      'MyChart / portal exports are Oldchart, not Others. Even though it looks administrative, it’s a historical record copy.',
    guardrailId: 'mychart-is-oldchart',
  },
  {
    id: 42,
    display: {
      sender: 'Barrie Walk-in Clinic',
      pages: 1,
      snippet:
        'Single lab record being forwarded as part of records transfer. CBC from 2023-08-14. All values within reference range.',
    },
    correctCategory: 'Oldchart',
    correctPriority: 'normal',
    suggestedDescription: 'Old chart — Historical lab from previous walk-in',
    teachingNote:
      'Even a single historical record sent as part of a transfer is Oldchart. Values normal, no active concerns → Normal.',
  },
  {
    id: 43,
    display: {
      sender: 'Dr. Anderson Family Practice',
      pages: 1,
      snippet:
        'Patient Consent for Release of Records (PHIPA). Patient: Khan, A. — authorizes transfer of chart to Optimal Health Holdings. Signed 2026-04-22.',
    },
    correctCategory: 'Oldchart',
    correctPriority: 'normal',
    suggestedDescription: 'Consent for Release of Records — PHIPA',
    teachingNote:
      'A consent form attached to a records transfer is Oldchart. Use the exact form title as written.',
    guardrailId: 'consent-transfer-vs-onboarding',
  },
  {
    id: 44,
    display: {
      sender: 'Optimal Health Holdings — Front Desk',
      pages: 2,
      snippet:
        'Fee schedule for non-insured services. Provided to new patients during introductory meeting. Includes pricing for memberships and add-on services.',
    },
    correctCategory: 'Others',
    correctPriority: 'normal',
    suggestedDescription: 'Fee schedule provided to patient during introductory meeting',
    teachingNote:
      "Readable admin content with no clinical value and no fit in another category → Others. Expand the generic 'Fee Schedule' title with the specific context.",
  },
  {
    id: 45,
    display: {
      sender: 'McKesson Medical Supplies',
      pages: 1,
      snippet:
        'Invoice #88421. Medical supplies delivered 2026-04-10. Total: $1,243.55 + HST. Payment due in 30 days.',
    },
    correctCategory: 'Others',
    correctPriority: 'normal',
    suggestedDescription: 'Vendor Invoice — Medical supplies',
    teachingNote:
      'Operational/admin invoice with no clinical content. Not Junk (it has business value), not Insurance → Others.',
    guardrailId: 'junk-not-catchall',
  },
  {
    id: 46,
    display: {
      sender: 'Simcoe Muskoka District Health Unit',
      pages: 2,
      snippet:
        'Public health notification: contact tracing for confirmed TB case in your area. List of potentially exposed patients attached. Please contact patients to arrange screening as per attached protocol.',
    },
    correctCategory: 'Others',
    correctPriority: 'abnormal',
    suggestedDescription: 'Public Health — TB contact tracing notification',
    teachingNote:
      "Public health notifications requiring clinic action are Others when they don't fit Lab. Action required from the clinic → abnormal.",
  },
  {
    id: 47,
    display: {
      sender: 'Unknown sender',
      pages: 1,
      snippet: '[Page is entirely blank]',
    },
    correctCategory: 'Junk',
    correctPriority: 'normal',
    suggestedDescription: '(none — set to null)',
    teachingNote:
      'Blank page → Junk. Junk is always Normal. Set documentDescription to null.',
  },
  {
    id: 48,
    display: {
      sender: 'MediPro Marketing',
      pages: 1,
      snippet:
        'SPECIAL OFFER for medical clinics! 50% off our new patient management software for the first year. Call now to schedule a demo!',
    },
    correctCategory: 'Junk',
    correctPriority: 'normal',
    suggestedDescription: '(none — set to null)',
    teachingNote:
      'Pure advertising with no clinical or administrative value → Junk.',
  },
  {
    id: 49,
    display: {
      sender: 'Innisfil Cardiology Associates',
      pages: 2,
      snippet:
        'CONSULT REFERRAL FORM RETURNED. Status: DECLINED — practice no longer accepting new referrals. Please redirect to another cardiology service. Patient: Lee, R., who was referred for evaluation of dyspnea.',
    },
    correctCategory: 'Consult',
    correctPriority: 'normal',
    suggestedDescription: 'Innisfil Cardiology — Referral declined',
    teachingNote:
      "Returned requisition for a CONSULT (cardiology) service → classify by the service. NOT Referral, NOT Others. Format the description as '[Sender] [Service] — [Annotation]'.",
    guardrailId: 'returned-req-by-service',
  },
  {
    id: 50,
    display: {
      sender: 'Royal Victoria Hospital — Diagnostic Imaging',
      pages: 1,
      snippet:
        'X-ray request, left wrist. Indication: ███ trauma ██████. Findings: ██ acute fracture ██████████. IMPRESSION: ██████████████████████ — [bulk of report illegible OCR]. Signed: ████, FRCPC.',
    },
    correctCategory: 'Radiology',
    correctPriority: 'abnormal',
    suggestedDescription: 'X-ray Report — Wrist',
    teachingNote:
      'When the impression/findings are largely illegible, default to abnormal (err on the side of caution per the priority rules). The signing credential FRCPC and DI letterhead still place this in Radiology.',
  },
];
