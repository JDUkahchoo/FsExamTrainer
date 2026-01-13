// NCEES FS Exam - 7 Knowledge Areas + Foundational Math Review
// Centralized domain mappings for consistency across application

export const NCEES_FS_DOMAINS = {
  0: "Math & Science Foundations",
  1: "Surveying Processes and Methods",
  2: "Mapping Processes and Methods",
  3: "Boundary Law and Real Property Principles",
  4: "Surveying Principles",
  5: "Survey Computations and Computer Applications",
  6: "Business Concepts",
  7: "Applied Mathematics and Statistics"
} as const;

// NCEES PS Exam - 5 Knowledge Areas
export const NCEES_PS_DOMAINS = {
  1: "Legal Principles",
  2: "Professional Survey Practices",
  3: "Standards and Specifications",
  4: "Business Practices",
  5: "Areas of Practice"
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

// Legacy alias
export const getAllDomains = getAllFSDomains;
