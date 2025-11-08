// NCEES FS Exam - 7 Knowledge Areas + Foundational Math Review
// Centralized domain mappings for consistency across application

export const NCEES_DOMAINS = {
  0: "Math & Science Foundations",
  1: "Surveying Processes and Methods",
  2: "Mapping Processes and Methods",
  3: "Boundary Law and Real Property Principles",
  4: "Surveying Principles",
  5: "Survey Computations and Computer Applications",
  6: "Business Concepts",
  7: "Applied Mathematics and Statistics"
} as const;

export type DomainNumber = keyof typeof NCEES_DOMAINS;

export const getDomainName = (domainNumber: DomainNumber): string => {
  return NCEES_DOMAINS[domainNumber];
};

export const getAllDomains = () => {
  return Object.entries(NCEES_DOMAINS).map(([num, name]) => ({
    number: parseInt(num) as DomainNumber,
    name
  }));
};
