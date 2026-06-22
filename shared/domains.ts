// NCEES FS Exam - 7 Knowledge Areas + Foundational Math Review
// Centralized domain mappings for consistency across application

export const NCEES_FS_DOMAINS = {
  0: "Math & Basic Science",
  1: "Field Data Acquisition",
  2: "Mapping, GIS, and CAD",
  3: "Boundary Law & PLSS",
  4: "Surveying Principles",
  5: "Survey Computations & Applications",
  6: "Professional Practice",
  7: "Applied Mathematics & Statistics"
} as const;

// NCEES PS Exam - 5 Knowledge Areas
export const NCEES_PS_DOMAINS = {
  1: "Legal Principles",
  2: "Professional Survey Practices",
  3: "Standards and Specifications",
  4: "Business Practices",
  5: "Areas of Practice"
} as const;

// Texas State-Specific Track - Topic Areas (not NCEES domains)
export const TX_DOMAINS = {
  1: "TBPELS Licensing & Rules",
  2: "Texas Boundary Law & GLO Surveys",
  3: "Texas Water Law",
  4: "Texas State Plane Zones",
  5: "Texas Survey Units & History",
  6: "Texas Professional Practice"
} as const;

// Legacy alias for backward compatibility
export const NCEES_DOMAINS = NCEES_FS_DOMAINS;

export type FSDomainNumber = keyof typeof NCEES_FS_DOMAINS;
export type PSDomainNumber = keyof typeof NCEES_PS_DOMAINS;
export type DomainNumber = FSDomainNumber; // Legacy alias

export const getFSDomainName = (domainNumber: FSDomainNumber): string => {
  return NCEES_FS_DOMAINS[domainNumber];
};

export const getPSDomainName = (domainNumber: PSDomainNumber): string => {
  return NCEES_PS_DOMAINS[domainNumber];
};

// Legacy alias
export const getDomainName = getFSDomainName;

export const getAllFSDomains = () => {
  return Object.entries(NCEES_FS_DOMAINS).map(([num, name]) => ({
    number: parseInt(num) as FSDomainNumber,
    name
  }));
};

export const getAllPSDomains = () => {
  return Object.entries(NCEES_PS_DOMAINS).map(([num, name]) => ({
    number: parseInt(num) as PSDomainNumber,
    name
  }));
};

export type TXDomainNumber = keyof typeof TX_DOMAINS;

export const getTXDomainName = (domainNumber: TXDomainNumber): string => {
  return TX_DOMAINS[domainNumber];
};

export const getAllTXDomains = () => {
  return Object.entries(TX_DOMAINS).map(([num, name]) => ({
    number: parseInt(num) as TXDomainNumber,
    name
  }));
};

// Legacy alias
export const getAllDomains = getAllFSDomains;
