import { type ReactNode, type CSSProperties } from 'react';
import { useParams, useLocation, Redirect } from 'wouter';
import { BookOpen, Brain, ClipboardCheck, FileText, BarChart3, GraduationCap, BookMarked, Library, ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { EXAM_TRACKS } from '@shared/schema';

interface ExamLayoutProps {
  children: ReactNode;
}

const getMenuItems = (examTrack: string) => [
  { id: `/app/${examTrack}/dashboard`, icon: GraduationCap, label: 'Dashboard', testId: 'nav-dashboard' },
  { id: `/app/${examTrack}/study-plan`, icon: BookOpen, label: 'Study Plan', testId: 'nav-study-plan' },
  { id: `/app/${examTrack}/lessons`, icon: BookOpen, label: 'Lessons', testId: 'nav-lessons' },
  { id: `/app/${examTrack}/quiz`, icon: Brain, label: 'Practice Quiz', testId: 'nav-quiz' },
  { id: `/app/${examTrack}/flashcards`, icon: ClipboardCheck, label: 'Flashcards', testId: 'nav-flashcards' },
  { id: `/app/${examTrack}/exam`, icon: GraduationCap, label: 'Practice Exam', testId: 'nav-exam' },
  { id: `/app/${examTrack}/notes`, icon: FileText, label: 'Study Notes', testId: 'nav-notes' },
  { id: `/app/${examTrack}/progress`, icon: BarChart3, label: 'Progress', testId: 'nav-progress' },
  { id: `/app/${examTrack}/resources`, icon: BookMarked, label: 'Resources', testId: 'nav-resources' },
  { id: `/app/${examTrack}/reference-companion`, icon: Library, label: 'Reference Companion', testId: 'nav-reference-companion' },
  { id: `/app/${examTrack}/settings`, icon: Settings, label: 'Settings', testId: 'nav-settings' },
];

function ExamSidebar({ examTrack }: { examTrack: string }) {
  const [location] = useLocation();
  const menuItems = getMenuItems(examTrack);
  const examInfo = EXAM_TRACKS.find(t => t.id === examTrack);
  const examName = examInfo?.name || examTrack.toUpperCase();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">{examName}</h2>
            <p className="text-xs text-muted-foreground">Study Guide</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Study Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={location === item.id || location.startsWith(item.id + '/')} data-testid={item.testId}>
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
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Link href="/getting-started">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" data-testid="button-back-to-selection">
            <ArrowLeft className="h-4 w-4" />
            Change Exam
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export function ExamLayout({ children }: ExamLayoutProps) {
  const params = useParams<{ examTrack: string }>();
  const examTrack = params.examTrack || 'fs';

  const validExamTracks = ['fs', 'ps'];
  if (!validExamTracks.includes(examTrack)) {
    return <Redirect to="/getting-started" />;
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as CSSProperties}>
      <div className="flex h-screen w-full">
        <ExamSidebar examTrack={examTrack} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center border-b border-border p-2 bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
