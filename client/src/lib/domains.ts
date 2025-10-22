import type { Domain } from '@shared/schema';
import {
  Calculator,
  Map,
  Ruler,
  Globe2,
  Scale,
  Target,
  Briefcase,
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
  'Plane Survey Computations': {
    name: 'Plane Survey Computations',
    icon: Ruler,
    bgColor: 'bg-domain-computations',
    textColor: 'text-domain-computations-fg',
    borderColor: 'border-domain-computations-fg'
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
  'Geodesy, GPS, Astronomy': {
    name: 'Geodesy, GPS, Astronomy',
    icon: Target,
    bgColor: 'bg-domain-geodesy',
    textColor: 'text-domain-geodesy-fg',
    borderColor: 'border-domain-geodesy-fg'
  },
  'Professional Practice': {
    name: 'Professional Practice',
    icon: Briefcase,
    bgColor: 'bg-domain-practice',
    textColor: 'text-domain-practice-fg',
    borderColor: 'border-domain-practice-fg'
  }
};

export function getDomainConfig(domain: Domain): DomainConfig {
  return DOMAIN_CONFIG[domain];
}
