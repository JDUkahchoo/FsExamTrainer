import { BookOpen, Brain, ClipboardCheck, ClipboardList, FileText, BarChart3, GraduationCap, BookMarked, MessageSquare, Star, HelpCircle, Library } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { EXAM_TRACKS, US_STATES, type UserPreferences, type ExamTrack } from '@shared/schema';

const menuItems = [
  { id: '/getting-started', icon: HelpCircle, label: 'Getting Started', testId: 'nav-getting-started' },
  { id: '/study-plan', icon: BookOpen, label: 'Study Plan', testId: 'nav-study-plan' },
  { id: '/quiz', icon: Brain, label: 'Practice Quiz', testId: 'nav-quiz' },
  { id: '/flashcards', icon: ClipboardCheck, label: 'Flashcards', testId: 'nav-flashcards' },
  { id: '/exam', icon: GraduationCap, label: 'Practice Exam', testId: 'nav-exam' },
  { id: '/notes', icon: FileText, label: 'Study Notes', testId: 'nav-notes' },
  { id: '/progress', icon: BarChart3, label: 'Progress', testId: 'nav-progress' },
  { id: '/resources', icon: BookMarked, label: 'Resources', testId: 'nav-resources' },
  { id: '/reference-companion', icon: Library, label: 'Reference Companion', testId: 'nav-reference-companion' },
  { id: '/procedures', icon: ClipboardList, label: 'Procedures & Standards', testId: 'nav-procedures' },
];

const communityItems = [
  { id: '/testimonials', icon: Star, label: 'Testimonials', testId: 'nav-testimonials' },
  { id: '/feedback', icon: MessageSquare, label: 'Feedback', testId: 'nav-feedback' },
];

const policyItems = [
  { id: '/privacy', icon: FileText, label: 'Privacy Policy', testId: 'nav-privacy' },
  { id: '/disclaimer', icon: FileText, label: 'Disclaimer', testId: 'nav-disclaimer' },
];

export function AppSidebar() {
  const [location] = useLocation();
  
  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  const currentExam = (preferences?.preferredExamTrack as ExamTrack) || 'fs';
  const currentState = preferences?.stateCode;
  const examTrack = EXAM_TRACKS.find(t => t.id === currentExam);
  const stateName = currentState ? US_STATES.find(s => s.code === currentState)?.name : null;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">{examTrack?.name || 'FS Exam'}</h2>
            <p className="text-xs text-muted-foreground">
              {stateName ? `${stateName} Study Guide` : 'Study Guide'}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Study Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const fullPath = `/app/${currentExam}${item.id}`;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={location === fullPath || location.endsWith(item.id)} data-testid={item.testId}>
                      <Link href={fullPath}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={location === item.id} data-testid={item.testId}>
                    <Link href={item.id}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Legal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {policyItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={location === item.id} data-testid={item.testId}>
                    <Link href={item.id}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
