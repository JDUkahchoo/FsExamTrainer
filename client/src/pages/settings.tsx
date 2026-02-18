import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Settings, Palette, User, Bell, HelpCircle, Trash2, ExternalLink, Loader2, Sun, Moon, Monitor, Star, MessageSquare } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useExamTrack } from '@/contexts/exam-track-context';
import { Link } from 'wouter';
import type { UserPreferences } from '@shared/schema';

type Theme = 'light' | 'dark' | 'system';

function ProfileNameForm({ user }: { user?: { id: string; email?: string; firstName?: string; lastName?: string; profileImageUrl?: string } }) {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiRequest('PATCH', '/api/auth/user', { firstName, lastName });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      toast({ title: "Name updated", description: "Your display name has been saved." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update name.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = firstName !== (user?.firstName || '') || lastName !== (user?.lastName || '');

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            maxLength={50}
            data-testid="input-first-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            maxLength={50}
            data-testid="input-last-name"
          />
        </div>
      </div>
      <Button 
        onClick={handleSave} 
        disabled={!hasChanges || isSaving}
        data-testid="button-save-name"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </div>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const { examTrack, examName } = useExamTrack();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fontSize') || 'medium';
    }
    return 'medium';
  });

  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  const { data: user } = useQuery<{ id: string; email?: string; firstName?: string; lastName?: string; profileImageUrl?: string }>({
    queryKey: ['/api/auth/user'],
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: Partial<UserPreferences>) => apiRequest('PATCH', '/api/preferences', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
      toast({ title: "Settings saved", description: "Your preferences have been updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    },
  });

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', systemDark);
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    
    const root = document.documentElement;
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
    }
  };

  const handleResetProgress = async () => {
    setIsResetting(true);
    try {
      await apiRequest('POST', '/api/user/reset', { confirm: true });
      queryClient.invalidateQueries();
      toast({
        title: "Progress reset",
        description: "Your study data has been cleared. You can start fresh!",
      });
      setShowResetDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your preferences and account</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 gap-1">
          <TabsTrigger value="general" className="gap-2" data-testid="tab-general">
            <Settings className="h-4 w-4 hidden sm:block" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2" data-testid="tab-appearance">
            <Palette className="h-4 w-4 hidden sm:block" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2" data-testid="tab-account">
            <User className="h-4 w-4 hidden sm:block" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2" data-testid="tab-notifications">
            <Bell className="h-4 w-4 hidden sm:block" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="help" className="gap-2" data-testid="tab-help">
            <HelpCircle className="h-4 w-4 hidden sm:block" />
            Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Preferences</CardTitle>
              <CardDescription>Configure your study experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Current Exam Track</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-base px-3 py-1">{examName}</Badge>
                  <Link href="/getting-started">
                    <Button variant="ghost" size="sm" data-testid="button-change-exam">
                      Change Exam
                    </Button>
                  </Link>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="study-mode">Study Mode</Label>
                <Select
                  value={preferences?.studyMode || 'standard'}
                  onValueChange={(value) => updatePreferencesMutation.mutate({ studyMode: value })}
                >
                  <SelectTrigger id="study-mode" data-testid="select-study-mode">
                    <SelectValue placeholder="Select study mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (16 weeks)</SelectItem>
                    <SelectItem value="result-driven">Result-Driven (Flexible)</SelectItem>
                    <SelectItem value="working-professional">Working Professional (Extended)</SelectItem>
                    <SelectItem value="custom">Custom Plan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose how you want to structure your study schedule
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select defaultValue="auto">
                  <SelectTrigger id="timezone" data-testid="select-timezone">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Color Theme</Label>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => handleThemeChange('light')}
                    data-testid="button-theme-light"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => handleThemeChange('dark')}
                    data-testid="button-theme-dark"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => handleThemeChange('system')}
                    data-testid="button-theme-system"
                  >
                    <Monitor className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Font Size</Label>
                <div className="flex gap-2">
                  <Button
                    variant={fontSize === 'small' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => handleFontSizeChange('small')}
                    data-testid="button-font-small"
                  >
                    <span className="text-sm">Small</span>
                  </Button>
                  <Button
                    variant={fontSize === 'medium' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => handleFontSizeChange('medium')}
                    data-testid="button-font-medium"
                  >
                    <span className="text-base">Medium</span>
                  </Button>
                  <Button
                    variant={fontSize === 'large' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => handleFontSizeChange('large')}
                    data-testid="button-font-large"
                  >
                    <span className="text-lg">Large</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your display name and profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {user?.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="h-16 w-16 rounded-full"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{user?.email || 'Replit User'}</p>
                </div>
              </div>
              
              <Separator />
              
              <ProfileNameForm user={user} />
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reset All Progress</p>
                  <p className="text-sm text-muted-foreground">
                    Clear all your study data, quiz results, and start fresh
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => setShowResetDialog(true)}
                  data-testid="button-reset-progress"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Study Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded to study daily
                  </p>
                </div>
                <Switch disabled data-testid="switch-study-reminders" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Progress Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly summary of your progress
                  </p>
                </div>
                <Switch disabled data-testid="switch-progress-updates" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you earn badges
                  </p>
                </div>
                <Switch disabled data-testid="switch-achievement-alerts" />
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  Notification features coming soon! We're working on bringing you study reminders and progress updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
              <CardDescription>Share your experience and read what others say</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href={`/app/${examTrack}/testimonials`}>
                <Button variant="outline" className="w-full justify-between" data-testid="link-testimonials">
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Testimonials
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/app/${examTrack}/feedback`}>
                <Button variant="outline" className="w-full justify-between" data-testid="link-feedback">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Send Feedback
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>Get help and learn more about the app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href={`/app/${examTrack}/privacy`}>
                <Button variant="outline" className="w-full justify-between" data-testid="link-privacy">
                  Privacy Policy
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/app/${examTrack}/disclaimer`}>
                <Button variant="outline" className="w-full justify-between" data-testid="link-disclaimer">
                  Disclaimer
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>Application information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Build</span>
                <span>2026.01</span>
              </div>
              <Separator className="my-3" />
              <p className="text-xs text-muted-foreground">
                FS/PS Exam Study Guide - Helping future surveyors prepare for their licensing exams.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your study progress, quiz results, flashcard mastery, 
              study notes, and reset your XP to zero. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isResetting} data-testid="button-cancel-reset">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleResetProgress} 
              disabled={isResetting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-reset"
            >
              {isResetting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Yes, reset everything'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

