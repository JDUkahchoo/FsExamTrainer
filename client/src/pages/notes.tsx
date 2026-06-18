import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Save, Loader2, Plus, Trash2, BookOpen, Search, StickyNote, Hash, Download } from 'lucide-react';
import { NCEES_DOMAINS } from '@shared/domains';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { StudyNote } from '@shared/schema';

const DOMAIN_OPTIONS = Object.entries(NCEES_DOMAINS).map(([num, name]) => ({
  value: num,
  label: `Domain ${num}: ${name}`,
  num: parseInt(num),
}));

const DOMAIN_COLORS: Record<number, { bg: string; text: string; border: string; dot: string }> = {
  0: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-300 dark:border-slate-600', dot: 'bg-slate-400' },
  1: { bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700', dot: 'bg-blue-500' },
  2: { bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-700 dark:text-green-300', border: 'border-green-300 dark:border-green-700', dot: 'bg-green-500' },
  3: { bg: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-700', dot: 'bg-purple-500' },
  4: { bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-300 dark:border-orange-700', dot: 'bg-orange-500' },
  5: { bg: 'bg-pink-50 dark:bg-pink-950', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-300 dark:border-pink-700', dot: 'bg-pink-500' },
  6: { bg: 'bg-cyan-50 dark:bg-cyan-950', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700', dot: 'bg-cyan-500' },
  7: { bg: 'bg-amber-50 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700', dot: 'bg-amber-500' },
};

function getDomainColor(domainNumber: number | null | undefined) {
  if (domainNumber === null || domainNumber === undefined) return DOMAIN_COLORS[0];
  return DOMAIN_COLORS[domainNumber] ?? DOMAIN_COLORS[0];
}

function getDomainBadgeClass(domainNumber: number | null | undefined): string {
  const c = getDomainColor(domainNumber);
  return `${c.bg} ${c.text}`;
}

function getContentPreview(content: string): string {
  if (!content) return 'Empty note';
  const trimmed = content.trim().substring(0, 120);
  return trimmed.length < content.trim().length ? trimmed + '...' : trimmed;
}

export default function NotesPage() {
  const [selectedDomain, setSelectedDomain] = useState<number>(1);
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteDomain, setNewNoteDomain] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'domain' | 'search'>('domain');
  const { toast } = useToast();

  const { data: allNotes = [], isLoading } = useQuery<StudyNote[]>({
    queryKey: ['/api/notes']
  });

  const { data: domainNotes = [] } = useQuery<StudyNote[]>({
    queryKey: ['/api/notes/domain', selectedDomain],
    queryFn: async () => {
      const response = await fetch(`/api/notes/domain/${selectedDomain}`, { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch notes');
      return response.json();
    },
    enabled: viewMode === 'domain',
  });

  const createNoteMutation = useMutation({
    mutationFn: (note: { title: string; content: string; domainNumber: number }) =>
      apiRequest('POST', '/api/notes', note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notes/domain', selectedDomain] });
      setIsCreateDialogOpen(false);
      setNewNoteTitle('');
      setNewNoteDomain(String(selectedDomain));
      toast({ title: 'Note created', description: 'Your new note has been created.' });
    }
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<StudyNote> }) =>
      apiRequest('PATCH', `/api/notes/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notes/domain', selectedDomain] });
      toast({ title: 'Note saved', description: 'Your changes have been saved.' });
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notes/domain', selectedDomain] });
      setSelectedNote(null);
      toast({ title: 'Note deleted', description: 'The note has been removed.' });
    }
  });

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allNotes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [searchQuery, allNotes]);

  const displayNotes = viewMode === 'search' ? searchResults : domainNotes;

  const notesCountByDomain = useMemo(() =>
    allNotes.reduce((acc, note) => {
      if (note.domainNumber !== null && note.domainNumber !== undefined) {
        acc[note.domainNumber] = (acc[note.domainNumber] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>),
    [allNotes]
  );

  const domainsWithNotes = Object.keys(notesCountByDomain).length;
  const totalCharacters = allNotes.reduce((sum, n) => sum + n.content.length, 0);

  useEffect(() => {
    if (selectedNote) setEditingContent(selectedNote.content);
  }, [selectedNote]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedNote && editingContent !== selectedNote.content && editingContent.length > 0) {
        updateNoteMutation.mutate({ id: selectedNote.id, updates: { content: editingContent } });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [editingContent]);

  // When switching domain, clear selected note
  useEffect(() => {
    setSelectedNote(null);
  }, [selectedDomain]);

  const handleExportPdf = useCallback(async (note: StudyNote) => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    let y = margin;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(note.title, margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    const meta: string[] = [];
    if (note.domainNumber !== null && note.domainNumber !== undefined) {
      const domainLabel = DOMAIN_OPTIONS.find(d => d.value === String(note.domainNumber))?.label;
      if (domainLabel) meta.push(domainLabel);
    }
    if (meta.length > 0) {
      doc.text(meta.join('  |  '), margin, y);
      y += 6;
    }

    doc.setTextColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.setFont('courier', 'normal');

    const lines = doc.splitTextToSize(note.content || '(empty note)', maxLineWidth);
    for (const line of lines) {
      if (y > 270) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += 5.5;
    }

    const safeTitle = note.title.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40);
    const domainTag = note.domainNumber !== null && note.domainNumber !== undefined ? `d${note.domainNumber}-` : '';
    const filename = `study-note-${domainTag}${safeTitle}.pdf`;
    doc.save(filename);
    toast({ title: 'PDF exported', description: `Saved as ${filename}` });
  }, [toast]);

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) {
      toast({ title: 'Title required', description: 'Please enter a title for your note.', variant: 'destructive' });
      return;
    }
    createNoteMutation.mutate({
      title: newNoteTitle.trim(),
      content: '',
      domainNumber: parseInt(newNoteDomain),
    });
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(noteId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const currentDomainColor = getDomainColor(selectedDomain);
  const currentDomainName = NCEES_DOMAINS[selectedDomain as keyof typeof NCEES_DOMAINS] ?? `Domain ${selectedDomain}`;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-notes">Study Notes</h1>
        <p className="text-muted-foreground">
          Create and organize notes by NCEES domain. Tag your notes to any of the 8 exam domains for structured review.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <StickyNote className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="stat-total-notes">{allNotes.length}</p>
              <p className="text-xs text-muted-foreground">Total Notes</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
              <Hash className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="stat-domains-with-notes">{domainsWithNotes}</p>
              <p className="text-xs text-muted-foreground">Domains Covered</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="stat-domain-notes">{domainNotes.length}</p>
              <p className="text-xs text-muted-foreground">In Selected Domain</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
              <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="stat-total-chars">
                {totalCharacters > 1000 ? `${(totalCharacters / 1000).toFixed(1)}k` : totalCharacters}
              </p>
              <p className="text-xs text-muted-foreground">Characters Written</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Domain heat-map */}
      <Card className="mb-6 p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Notes by Domain</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {DOMAIN_OPTIONS.map(({ num, label }) => {
            const count = notesCountByDomain[num] || 0;
            const colors = DOMAIN_COLORS[num] ?? DOMAIN_COLORS[0];
            const isSelected = selectedDomain === num && viewMode === 'domain';
            return (
              <button
                key={num}
                onClick={() => {
                  setSelectedDomain(num);
                  setViewMode('domain');
                  setSearchQuery('');
                }}
                title={label}
                className={`
                  p-2 rounded-md border text-center transition-all hover-elevate
                  ${isSelected ? `${colors.border} ${colors.bg} ring-2 ring-offset-1 ring-current` : 'border-border hover:border-primary/40'}
                  ${count > 0 ? colors.bg : ''}
                `}
                data-testid={`button-domain-${num}`}
              >
                <div className={`text-sm font-bold ${isSelected ? colors.text : 'text-foreground'}`}>D{num}</div>
                <div className="text-xs text-muted-foreground">
                  {count > 0 ? `${count}` : '–'}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={viewMode === 'domain' ? 'default' : 'outline'}
            onClick={() => { setViewMode('domain'); setSearchQuery(''); }}
            data-testid="button-view-domain"
          >
            <Hash className="w-4 h-4 mr-1" />
            By Domain
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'search' ? 'default' : 'outline'}
            onClick={() => setViewMode('search')}
            data-testid="button-view-search"
          >
            <Search className="w-4 h-4 mr-1" />
            Search All
          </Button>
        </div>

        {viewMode === 'domain' && (
          <Select
            value={String(selectedDomain)}
            onValueChange={(v) => {
              setSelectedDomain(parseInt(v));
              setSelectedNote(null);
            }}
          >
            <SelectTrigger className="w-72" data-testid="select-domain">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {DOMAIN_OPTIONS.map(({ value, label, num }) => (
                <SelectItem key={value} value={value}>
                  {label} {notesCountByDomain[num] ? `(${notesCountByDomain[num]})` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {viewMode === 'search' && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all notes by title or content..."
              className="pl-9"
              data-testid="input-search-notes"
            />
          </div>
        )}

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setNewNoteDomain(String(selectedDomain))}
              data-testid="button-create-note"
            >
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
                <Label>Domain</Label>
                <Select value={newNoteDomain} onValueChange={setNewNoteDomain}>
                  <SelectTrigger className="mt-2" data-testid="select-new-note-domain">
                    <SelectValue placeholder="Select domain..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DOMAIN_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handleCreateNote}
                disabled={createNoteMutation.isPending}
                data-testid="button-save-new-note"
              >
                {createNoteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Create Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Domain context banner */}
      {viewMode === 'domain' && (
        <Card className={`p-4 mb-6 border ${currentDomainColor.border} ${currentDomainColor.bg}`}>
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${currentDomainColor.dot}`} />
            <p className={`text-sm font-semibold ${currentDomainColor.text}`}>
              Domain {selectedDomain}: {currentDomainName}
            </p>
            {notesCountByDomain[selectedDomain] ? (
              <Badge variant="secondary" className="ml-auto text-xs">
                {notesCountByDomain[selectedDomain]} note{notesCountByDomain[selectedDomain] !== 1 ? 's' : ''}
              </Badge>
            ) : null}
          </div>
        </Card>
      )}

      {/* Notes list + editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {viewMode === 'search'
              ? (searchQuery ? 'Search Results' : 'Type to search')
              : `Domain ${selectedDomain} Notes`
            }
            {displayNotes.length > 0 && <Badge variant="secondary">{displayNotes.length}</Badge>}
          </h3>

          {displayNotes.length === 0 ? (
            <Card className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">
                {viewMode === 'search'
                  ? (searchQuery ? 'No notes match your search.' : 'Search across all your study notes.')
                  : `No notes for Domain ${selectedDomain} yet.`
                }
              </p>
              {viewMode === 'domain' && (
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Note
                </Button>
              )}
            </Card>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {displayNotes.map(note => {
                const colors = getDomainColor(note.domainNumber);
                return (
                  <Card
                    key={note.id}
                    className={`p-4 cursor-pointer transition-all hover-elevate ${selectedNote?.id === note.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedNote(note)}
                    data-testid={`card-note-${note.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{note.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {getContentPreview(note.content)}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {note.domainNumber !== null && note.domainNumber !== undefined && (
                            <Badge className={`text-xs ${getDomainBadgeClass(note.domainNumber)}`}>
                              D{note.domainNumber}
                            </Badge>
                          )}
                          {viewMode === 'search' && note.domainNumber !== null && note.domainNumber !== undefined && (
                            <span className={`text-xs ${colors.text}`}>
                              {NCEES_DOMAINS[note.domainNumber as keyof typeof NCEES_DOMAINS]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
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
                    size="sm"
                    onClick={() => handleExportPdf(selectedNote)}
                    data-testid="button-export-pdf"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
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
                placeholder="Start taking notes… Include key concepts, formulas, practice problems, or anything you want to remember."
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
    </div>
  );
}
