import { type ReactNode, type CSSProperties } from 'react';
import { useLocation } from 'wouter';
import {
  BookOpen, Brain, ClipboardCheck, ClipboardList, FileText, BarChart3,
  GraduationCap, BookMarked, Library, ArrowLeft, Settings, ScrollText,
  Target, Calculator, LayoutDashboard
} from 'lucide-react';
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
  examTrack?: 'fs' | 'ps';
}

const learnItems = (examTrack: string) => [
  { id: `/app/${examTrack}/study-plan`, icon: BookOpen, label: 'Study Plan', testId: 'nav-study-plan' },
  { id: `/app/${examTrack}/lessons`, icon: BookOpen, label: 'Lessons', testId: 'nav-lessons' },
  { id: `/app/${examTrack}/readings`, icon: ScrollText, label: 'Interactive Readings', testId: 'nav-readings' },
];

const practiceItems = (examTrack: string) => [
  { id: `/app/${examTrack}/quiz`, icon: Brain, label: 'Practice Quiz', testId: 'nav-quiz' },
  { id: `/app/${examTrack}/drill`, icon: Target, label: 'Weak Area Drill', testId: 'nav-drill' },
  { id: `/app/${examTrack}/flashcards`, icon: ClipboardCheck, label: 'Flashcards', testId: 'nav-flashcards' },
  { id: `/app/${examTrack}/exam`, icon: GraduationCap, label: 'Practice Exam', testId: 'nav-exam' },
];

const referenceItems = (examTrack: string) => [
  ...(examTrack === 'fs' ? [{ id: `/app/${examTrack}/resources`, icon: BookMarked, label: 'Resources', testId: 'nav-resources' }] : []),
  { id: `/app/${examTrack}/reference-companion`, icon: Library, label: 'Reference Companion', testId: 'nav-reference-companion' },
  { id: `/app/${examTrack}/procedures`, icon: ClipboardList, label: 'Procedures & Standards', testId: 'nav-procedures' },
  { id: `/app/${examTrack}/formulas`, icon: Calculator, label: 'Formula Reference', testId: 'nav-formulas' },
];

const trackItems = (examTrack: string) => [
  { id: `/app/${examTrack}/progress`, icon: BarChart3, label: 'Progress', testId: 'nav-progress' },
  { id: `/app/${examTrack}/notes`, icon: FileText, label: 'Study Notes', testId: 'nav-notes' },
];

function NavGroup({ label, items, location }: { label: string; items: { id: string; icon: any; label: string; testId: string }[]; location: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={location === item.id || location.startsWith(item.id + '/')}
                data-testid={item.testId}
              >
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
  );
}

function ExamSidebar({ examTrack }: { examTrack: string }) {
  const [location] = useLocation();
  const examInfo = EXAM_TRACKS.find(t => t.id === examTrack);
  const examName = examInfo?.name || examTrack.toUpperCase();
  const dashboardPath = `/app/${examTrack}/dashboard`;

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
        {/* Dashboard — top-level, no group label */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location === dashboardPath}
                  data-testid="nav-dashboard"
                >
                  <Link href={dashboardPath}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <NavGroup label="Learn" items={learnItems(examTrack)} location={location} />
        <NavGroup label="Practice" items={practiceItems(examTrack)} location={location} />
        <NavGroup label="Reference" items={referenceItems(examTrack)} location={location} />
        <NavGroup label="Track" items={trackItems(examTrack)} location={location} />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-1">
        <Link href={`/app/${examTrack}/settings`}>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${location === `/app/${examTrack}/settings` ? 'bg-accent' : ''}`}
            data-testid="nav-settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Link href="/getting-started">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" data-testid="button-back-to-selection">
            <ArrowLeft className="h-4 w-4" />
            Change Exam
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export function ExamLayout({ children, examTrack: examTrackProp }: ExamLayoutProps) {
  const [location] = useLocation();

  const examTrack = examTrackProp || (location.startsWith('/app/ps/') ? 'ps' : 'fs');

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
