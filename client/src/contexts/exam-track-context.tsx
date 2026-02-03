import { createContext, useContext, ReactNode, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import type { UserPreferences } from "@shared/schema";
import { getAllFSDomains, getAllPSDomains } from "@shared/domains";
import { apiRequest, queryClient } from "@/lib/queryClient";

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

interface ExamTrackProviderProps {
  children: ReactNode;
  examTrackOverride?: 'fs' | 'ps';
}

export function ExamTrackProvider({ children, examTrackOverride }: ExamTrackProviderProps) {
  const params = useParams<{ examTrack?: string }>();
  
  const { data: preferences, isLoading } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  const updateTimezone = useMutation({
    mutationFn: async (timezone: string) => {
      return apiRequest('PATCH', '/api/preferences', { timezone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    },
  });

  useEffect(() => {
    if (!preferences || isLoading) return;
    
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (preferences.timezone !== browserTimezone && !updateTimezone.isPending) {
      console.log(`[Timezone] Detected browser timezone: ${browserTimezone}, updating from: ${preferences.timezone}`);
      updateTimezone.mutate(browserTimezone);
    }
  }, [preferences, isLoading]);

  const examTrack: 'fs' | 'ps' = useMemo(() => {
    if (examTrackOverride) return examTrackOverride;
    
    const urlTrack = params.examTrack;
    if (urlTrack === 'ps') return 'ps';
    if (urlTrack === 'fs') return 'fs';
    
    const prefTrack = preferences?.preferredExamTrack;
    if (prefTrack === 'ps') return 'ps';
    return 'fs';
  }, [examTrackOverride, params.examTrack, preferences?.preferredExamTrack]);

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
