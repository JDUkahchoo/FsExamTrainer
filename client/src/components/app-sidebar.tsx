import { BookOpen, Brain, ClipboardCheck, FileText, BarChart3, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'wouter';
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

const menuItems = [
  { id: '/', icon: BookOpen, label: 'Study Plan', testId: 'nav-study-plan' },
  { id: '/quiz', icon: Brain, label: 'Practice Quiz', testId: 'nav-quiz' },
  { id: '/flashcards', icon: ClipboardCheck, label: 'Flashcards', testId: 'nav-flashcards' },
  { id: '/exam', icon: GraduationCap, label: 'Practice Exam', testId: 'nav-exam' },
  { id: '/notes', icon: FileText, label: 'Study Notes', testId: 'nav-notes' },
  { id: '/progress', icon: BarChart3, label: 'Progress', testId: 'nav-progress' },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">FS Exam</h2>
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
