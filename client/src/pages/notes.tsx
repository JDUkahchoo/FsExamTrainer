import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Save, Loader2, Plus, Trash2, Calendar, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDY_PLAN } from '@shared/data/studyPlan';
import { NCEES_DOMAINS } from '@shared/domains';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { StudyNote } from '@shared/schema';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DOMAIN_OPTIONS = Object.entries(NCEES_DOMAINS).map(([num, name]) => ({
  value: num,
  label: `Domain ${num}: ${name}`
}));

export default function NotesPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteDomain, setNewNoteDomain] = useState<string | null>(null);
  const [newNoteDay, setNewNoteDay] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: allNotes = [], isLoading } = useQuery<StudyNote[]>({
    queryKey: ['/api/notes']
  });

  const { data: weekNotes = [] } = useQuery<StudyNote[]>({
    queryKey: ['/api/notes/week', selectedWeek],
    queryFn: async () => {
      const response = await fetch(`/api/notes/week/${selectedWeek}`, { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch notes');
      return response.json();
    }
  });

  const createNoteMutation = useMutation({
    mutationFn: (note: { title: string; content: string; week: number; dayOfWeek?: string; domainNumber?: number }) =>
      apiRequest('POST', '/api/notes', note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notes/week', selectedWeek] });
      setIsCreateDialogOpen(false);
      setNewNoteTitle('');
      setNewNoteDomain(null);
      setNewNoteDay(null);
      toast({ title: 'Note created', description: 'Your new note has been created.' });
    }
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<StudyNote> }) =>
      apiRequest('PATCH', `/api/notes/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notes/week', selectedWeek] });
      toast({ title: 'Note saved', description: 'Your changes have been saved.' });
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notes/week', selectedWeek] });
      setSelectedNote(null);
      toast({ title: 'Note deleted', description: 'The note has been removed.' });
    }
  });

  const filteredNotes = selectedDay 
    ? weekNotes.filter(n => n.dayOfWeek === selectedDay)
    : weekNotes;

  const currentWeekPlan = STUDY_PLAN.find(plan => plan.week === selectedWeek);

  useEffect(() => {
    if (selectedNote) {
      setEditingContent(selectedNote.content);
    }
  }, [selectedNote]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedNote && editingContent !== selectedNote.content && editingContent.length > 0) {
        updateNoteMutation.mutate({ id: selectedNote.id, updates: { content: editingContent } });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [editingContent]);

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) {
      toast({ title: 'Title required', description: 'Please enter a title for your note.', variant: 'destructive' });
      return;
    }
    createNoteMutation.mutate({
      title: newNoteTitle.trim(),
      content: '',
      week: selectedWeek,
      dayOfWeek: newNoteDay || undefined,
      domainNumber: newNoteDomain ? parseInt(newNoteDomain) : undefined
    });
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(noteId);
    }
  };

  const getDomainBadgeClass = (domainNumber: number | null | undefined): string => {
    if (domainNumber === null || domainNumber === undefined) return 'bg-muted text-muted-foreground';
    const colorMap: Record<number, string> = {
      0: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      1: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      2: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      3: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      4: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      5: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      6: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
      7: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    };
    return colorMap[domainNumber] || 'bg-muted text-muted-foreground';
  };

  const notesCountByWeek = allNotes.reduce((acc, note) => {
    if (note.week) {
      acc[note.week] = (acc[note.week] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-notes">Study Notes</h1>
        <p className="text-muted-foreground">
          Create and organize notes for each day of your study week. Tag notes by domain for easy reference.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
            disabled={selectedWeek <= 1}
            data-testid="button-prev-week"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Select
            value={selectedWeek.toString()}
            onValueChange={(value) => {
              setSelectedWeek(parseInt(value));
              setSelectedNote(null);
              setSelectedDay(null);
            }}
          >
            <SelectTrigger className="w-64" data-testid="select-week">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              {STUDY_PLAN.map(plan => (
                <SelectItem key={plan.week} value={plan.week.toString()}>
                  Week {plan.week}: {plan.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setSelectedWeek(Math.min(STUDY_PLAN.length, selectedWeek + 1))}
            disabled={selectedWeek >= STUDY_PLAN.length}
            data-testid="button-next-week"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-note">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="note-title">Title</Label>
                <Input
                  id="note-title"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Enter note title..."
                  data-testid="input-note-title"
                />
              </div>
              <div>
                <Label>Day of Week (optional)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {DAYS_OF_WEEK.map(day => (
                    <Button
                      key={day}
                      variant={newNoteDay === day ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewNoteDay(newNoteDay === day ? null : day)}
                      data-testid={`button-day-${day.toLowerCase()}`}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Domain Tag (optional)</Label>
                <Select value={newNoteDomain || ''} onValueChange={(v) => setNewNoteDomain(v || null)}>
                  <SelectTrigger className="mt-2" data-testid="select-domain">
                    <SelectValue placeholder="Select domain..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DOMAIN_OPTIONS.map(domain => (
                      <SelectItem key={domain.value} value={domain.value}>
                        {domain.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateNote} disabled={createNoteMutation.isPending} data-testid="button-save-new-note">
                {createNoteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Create Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedDay === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedDay(null)}
          data-testid="button-filter-all"
        >
          All Days
        </Button>
        {DAYS_OF_WEEK.map(day => (
          <Button
            key={day}
            variant={selectedDay === day ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDay(day)}
            data-testid={`button-filter-${day.toLowerCase()}`}
          >
            {day}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Notes for Week {selectedWeek}
            <Badge variant="secondary">{filteredNotes.length}</Badge>
          </h3>
          
          {filteredNotes.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">No notes for this {selectedDay ? `${selectedDay}day` : 'week'} yet.</p>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Note
              </Button>
            </Card>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredNotes.map(note => (
                <Card
                  key={note.id}
                  className={`p-4 cursor-pointer transition-all hover-elevate ${selectedNote?.id === note.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedNote(note)}
                  data-testid={`card-note-${note.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{note.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {note.dayOfWeek && (
                          <Badge variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            {note.dayOfWeek}
                          </Badge>
                        )}
                        {note.domainNumber !== null && note.domainNumber !== undefined && (
                          <Badge className={getDomainBadgeClass(note.domainNumber)}>
                            D{note.domainNumber}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {note.content.length} characters
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="lg:col-span-2 p-6">
          {selectedNote ? (
            <>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-foreground truncate">{selectedNote.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {selectedNote.dayOfWeek && (
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {selectedNote.dayOfWeek}
                      </Badge>
                    )}
                    {selectedNote.domainNumber !== null && selectedNote.domainNumber !== undefined && (
                      <Badge className={getDomainBadgeClass(selectedNote.domainNumber)}>
                        {DOMAIN_OPTIONS.find(d => d.value === String(selectedNote.domainNumber))?.label || `Domain ${selectedNote.domainNumber}`}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteNote(selectedNote.id)}
                    data-testid="button-delete-note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => updateNoteMutation.mutate({ id: selectedNote.id, updates: { content: editingContent } })}
                    disabled={updateNoteMutation.isPending}
                    data-testid="button-save-note"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                placeholder="Start taking notes... Include key concepts, formulas, practice problems, or anything you want to remember."
                className="min-h-[450px] font-mono text-sm"
                data-testid="textarea-notes"
              />

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>{editingContent.length} characters</span>
                <span>Auto-saves after 2 seconds of inactivity</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Select a Note</h3>
              <p className="text-muted-foreground mb-4">Choose a note from the list or create a new one</p>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Note
              </Button>
            </div>
          )}
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="font-semibold text-foreground mb-4">Notes Overview by Week</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-2">
          {STUDY_PLAN.map(plan => {
            const count = notesCountByWeek[plan.week] || 0;
            return (
              <button
                key={plan.week}
                onClick={() => {
                  setSelectedWeek(plan.week);
                  setSelectedNote(null);
                  setSelectedDay(null);
                }}
                className={`
                  p-2 rounded-md border text-center transition-all hover-elevate
                  ${selectedWeek === plan.week ? 'border-primary bg-primary/10' : 'border-border'}
                  ${count > 0 ? 'bg-success/5' : ''}
                `}
                data-testid={`button-week-${plan.week}`}
              >
                <div className="text-sm font-bold text-foreground">W{plan.week}</div>
                <div className="text-xs text-muted-foreground">
                  {count > 0 ? `${count} notes` : '-'}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
