import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Lock, GraduationCap, FileText, MapPin, ArrowRight } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { EXAM_TRACKS, US_STATES, type ExamTrack, type UserPreferences } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export function ExamSelector() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  
  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  const updatePreferences = useMutation({
    mutationFn: async (data: { preferredExamTrack?: ExamTrack; stateCode?: string }) => {
      const res = await apiRequest('PATCH', '/api/preferences', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    },
  });

  const handleExamSelect = (examId: ExamTrack) => {
    const track = EXAM_TRACKS.find(t => t.id === examId);
    if (!track || track.status === 'coming-soon') {
      if (track) {
        toast({
          title: "Coming Soon",
          description: `${track.name} preparation is not yet available. Stay tuned!`,
        });
      }
      return;
    }
    updatePreferences.mutate({ preferredExamTrack: examId });
  };

  const handleStateChange = (stateCode: string) => {
    updatePreferences.mutate({ stateCode });
  };

  const handleEnterExam = (examId: ExamTrack) => {
    const track = EXAM_TRACKS.find(t => t.id === examId);
    if (!track || track.status === 'coming-soon') {
      toast({
        title: "Coming Soon",
        description: `${track?.name || 'This exam'} preparation is not yet available. Stay tuned!`,
      });
      return;
    }
    setLocation(`/app/${examId}/dashboard`);
  };

  const getExamIcon = (examId: ExamTrack) => {
    switch (examId) {
      case 'fs': return GraduationCap;
      case 'ps': return FileText;
      case 'state-specific': return MapPin;
      default: return GraduationCap;
    }
  };

  const currentState = preferences?.stateCode || 'TX';
  const currentExam = (preferences?.preferredExamTrack as ExamTrack) || 'fs';

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Your Licensure State</h3>
        <p className="text-sm text-muted-foreground">Select the state where you plan to get licensed</p>
        <Select value={currentState} onValueChange={handleStateChange}>
          <SelectTrigger className="w-full max-w-xs" data-testid="select-state">
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((state) => (
              <SelectItem 
                key={state.code} 
                value={state.code}
                data-testid={`state-option-${state.code}`}
              >
                <div className="flex items-center gap-2">
                  <span>{state.name}</span>
                  {state.available && (
                    <Badge variant="secondary" className="text-xs">Available</Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentState && (
          <p className="text-xs text-muted-foreground mt-1">
            Selected: {US_STATES.find(s => s.code === currentState)?.name || currentState}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Choose Your Exam Path</h3>
        <p className="text-sm text-muted-foreground">Select the exam you're preparing for, then enter your personalized study dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {EXAM_TRACKS.map((track) => {
          const Icon = getExamIcon(track.id);
          const isSelected = currentExam === track.id;
          const isAvailable = track.status === 'ready';

          return (
            <Card
              key={track.id}
              className={`relative p-4 transition-all ${
                isAvailable ? 'cursor-pointer hover-elevate' : 'cursor-not-allowed'
              } ${
                isSelected && isAvailable
                  ? 'ring-2 ring-primary border-primary'
                  : ''
              } ${!isAvailable ? 'opacity-60' : ''}`}
              onClick={isAvailable ? () => handleExamSelect(track.id) : undefined}
              data-testid={`exam-card-${track.id}`}
            >
              <div className="absolute top-3 right-3">
                {isAvailable ? (
                  isSelected ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Ready
                    </Badge>
                  )
                ) : (
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Coming Soon
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  track.id === 'fs' ? 'bg-blue-100 dark:bg-blue-900' :
                  track.id === 'ps' ? 'bg-purple-100 dark:bg-purple-900' :
                  'bg-orange-100 dark:bg-orange-900'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    track.id === 'fs' ? 'text-blue-600 dark:text-blue-400' :
                    track.id === 'ps' ? 'text-purple-600 dark:text-purple-400' :
                    'text-orange-600 dark:text-orange-400'
                  }`} />
                </div>

                <div>
                  <h4 className="font-semibold">{track.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {track.description}
                  </p>
                </div>

                {isAvailable ? (
                  <Button 
                    variant={isSelected ? "default" : "outline"} 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSelected) {
                        handleEnterExam(track.id);
                      } else {
                        handleExamSelect(track.id);
                      }
                    }}
                    data-testid={`button-select-${track.id}`}
                  >
                    {isSelected ? (
                      <>
                        Enter Study Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      'Select This Exam'
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    disabled
                    data-testid={`button-select-${track.id}`}
                  >
                    Coming Soon
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
        <p className="font-medium mb-1">Exam Path Information:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>FS Exam:</strong> Entry-level fundamentals exam - the first step toward licensure</li>
          <li><strong>PS Exam:</strong> Advanced professional practice exam - taken after work experience</li>
          <li><strong>State-Specific:</strong> State laws and regulations for your jurisdiction</li>
        </ul>
      </div>
    </div>
  );
}
