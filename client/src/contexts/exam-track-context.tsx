import { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UserPreferences, ExamTrack } from "@shared/schema";
import { getAllFSDomains, getAllPSDomains } from "@shared/domains";

export interface DomainInfo {
  number: number;
  name: string;
}

interface ExamTrackContextValue {
  examTrack: 'fs' | 'ps';
  isLoading: boolean;
  domains: DomainInfo[];
  examName: string;
  lessonCount: number;
  domainCount: number;
}

const ExamTrackContext = createContext<ExamTrackContextValue | undefined>(undefined);

export function ExamTrackProvider({ children }: { children: ReactNode }) {
  const { data: preferences, isLoading } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  const rawTrack = preferences?.preferredExamTrack;
  const examTrack: 'fs' | 'ps' = rawTrack === 'ps' ? 'ps' : 'fs';

  const domains = useMemo(() => {
    return examTrack === 'ps' ? getAllPSDomains() : getAllFSDomains();
  }, [examTrack]);

  const value: ExamTrackContextValue = {
    examTrack,
    isLoading,
    domains,
    examName: examTrack === 'ps' ? 'PS Exam' : 'FS Exam',
    lessonCount: examTrack === 'ps' ? 55 : 73,
    domainCount: examTrack === 'ps' ? 5 : 8,
  };

  return (
    <ExamTrackContext.Provider value={value}>
      {children}
    </ExamTrackContext.Provider>
  );
}

export function useExamTrack() {
  const context = useContext(ExamTrackContext);
  if (context === undefined) {
    throw new Error('useExamTrack must be used within an ExamTrackProvider');
  }
  return context;
}
