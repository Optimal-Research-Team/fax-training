export type CategoryId =
  | 'Lab'
  | 'Consult'
  | 'Radiology'
  | 'Imaging'
  | 'Pathology'
  | 'Prescription'
  | 'Insurance'
  | 'Legal'
  | 'Oldchart'
  | 'Others'
  | 'Junk';

export type Priority = 'normal' | 'abnormal';

export type Category = {
  id: CategoryId;
  name: string;
  /** Mid tone — borders, dots, chips */
  color: string;
  /** Light tinted background */
  bg: string;
  /** Dark accessible text on the light background */
  text: string;
  definition: string;
  examples: string[];
  namingExample: string;
  /** Guardrail most relevant to this category */
  mistakeId?: string;
};

export type Guardrail = {
  id: string;
  title: string;
  rule: string;
};

export type PerCategoryPriority = {
  abnormalIfAny?: string[];
  normalIf?: string;
  rule?: string;
};

export type PriorityRules = {
  global: {
    principle: string;
    constraint: string;
    rules: string[];
  };
  perCategory: Record<CategoryId, PerCategoryPriority>;
};

export type NamingSpecialRule = {
  trigger: string;
  rule: string;
  example: string | null;
};

export type NamingRules = {
  formula: string[];
  prefixes: string[];
  suffix1: string[];
  suffix2: string[];
  specialRules: NamingSpecialRule[];
};

export type TestFax = {
  id: number;
  display: {
    sender: string;
    pages: number;
    snippet: string;
  };
  correctCategory: CategoryId;
  correctPriority: Priority;
  suggestedDescription: string;
  teachingNote: string;
  guardrailId?: string;
};

export type TestAnswer = {
  faxId: number;
  selectedCategory: CategoryId | null;
  selectedPriority: Priority | null;
  isCategoryCorrect: boolean | null;
  isPriorityCorrect: boolean | null;
  timeSpentMs: number;
  reviewed: boolean;
};

export type ProgressState = {
  overviewSectionsVisited: string[];
  mistakesAcknowledged: string[];
  testAnswers: TestAnswer[];
  testIndex: number;
  startedAt: string;
  completedAt: string | null;
};
