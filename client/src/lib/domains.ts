import type { Domain } from '@shared/schema';
import {
  Calculator,
  Map,
  Ruler,
  Globe2,
  Scale,
  Target,
  Briefcase,
  Calculator as ComputerCalc,
  Compass,
  type LucideIcon
} from 'lucide-react';

export type DomainConfig = {
  name: Domain;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  borderColor: string;
};

export const DOMAIN_CONFIG: Record<Domain, DomainConfig> = {
  'Math & Basic Science': {
    name: 'Math & Basic Science',
    icon: Calculator,
    bgColor: 'bg-domain-math',
    textColor: 'text-domain-math-fg',
    borderColor: 'border-domain-math-fg'
  },
  'Field Data Acquisition': {
    name: 'Field Data Acquisition',
    icon: Map,
    bgColor: 'bg-domain-field',
    textColor: 'text-domain-field-fg',
    borderColor: 'border-domain-field-fg'
  },
  'Mapping, GIS, and CAD': {
    name: 'Mapping, GIS, and CAD',
    icon: Globe2,
    bgColor: 'bg-domain-mapping',
    textColor: 'text-domain-mapping-fg',
    borderColor: 'border-domain-mapping-fg'
  },
  'Boundary Law & PLSS': {
    name: 'Boundary Law & PLSS',
    icon: Scale,
    bgColor: 'bg-domain-boundary',
    textColor: 'text-domain-boundary-fg',
    borderColor: 'border-domain-boundary-fg'
  },
  'Surveying Principles': {
    name: 'Surveying Principles',
    icon: Compass,
    bgColor: 'bg-domain-computations',
    textColor: 'text-domain-computations-fg',
    borderColor: 'border-domain-computations-fg'
  },
  'Survey Computations & Applications': {
    name: 'Survey Computations & Applications',
    icon: Ruler,
    bgColor: 'bg-domain-computations',
    textColor: 'text-domain-computations-fg',
    borderColor: 'border-domain-computations-fg'
  },
  'Professional Practice': {
    name: 'Professional Practice',
    icon: Briefcase,
    bgColor: 'bg-domain-practice',
    textColor: 'text-domain-practice-fg',
    borderColor: 'border-domain-practice-fg'
  },
  'Applied Mathematics & Statistics': {
    name: 'Applied Mathematics & Statistics',
    icon: Target,
    bgColor: 'bg-domain-geodesy',
    textColor: 'text-domain-geodesy-fg',
    borderColor: 'border-domain-geodesy-fg'
  }
};

const PS_DOMAIN_CONFIG: Record<string, DomainConfig> = {
  'Legal Principles': {
    name: 'Boundary Law & PLSS' as Domain,
    icon: Scale,
    bgColor: 'bg-domain-boundary',
    textColor: 'text-domain-boundary-fg',
    borderColor: 'border-domain-boundary-fg'
  },
  'Professional Survey Practices': {
    name: 'Professional Practice' as Domain,
    icon: Briefcase,
    bgColor: 'bg-domain-practice',
    textColor: 'text-domain-practice-fg',
    borderColor: 'border-domain-practice-fg'
  },
  'Standards and Specifications': {
    name: 'Survey Computations & Applications' as Domain,
    icon: Ruler,
    bgColor: 'bg-domain-computations',
    textColor: 'text-domain-computations-fg',
    borderColor: 'border-domain-computations-fg'
  },
  'Business Practices': {
    name: 'Professional Practice' as Domain,
    icon: Briefcase,
    bgColor: 'bg-domain-field',
    textColor: 'text-domain-field-fg',
    borderColor: 'border-domain-field-fg'
  },
  'Areas of Practice': {
    name: 'Field Data Acquisition' as Domain,
    icon: Map,
    bgColor: 'bg-domain-mapping',
    textColor: 'text-domain-mapping-fg',
    borderColor: 'border-domain-mapping-fg'
  }
};

export function getDomainConfig(domain: Domain | string): DomainConfig {
  if (domain in DOMAIN_CONFIG) {
    return DOMAIN_CONFIG[domain as Domain];
  }
  if (domain in PS_DOMAIN_CONFIG) {
    return PS_DOMAIN_CONFIG[domain];
  }
  return {
    name: domain as Domain,
    icon: Calculator,
    bgColor: 'bg-muted',
    textColor: 'text-muted-foreground',
    borderColor: 'border-muted'
  };
}
