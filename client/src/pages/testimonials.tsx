import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Star, MessageSquare } from "lucide-react";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  examScore: z.number().min(0).max(100).optional().or(z.literal("")),
  passedExam: z.boolean().default(false),
  studyMode: z.string().optional(),
  message: z.string().min(20, "Please share at least 20 characters about your experience"),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface Testimonial {
  id: string;
  name: string;
  message: string;
  examScore?: number;
  passedExam: boolean;
  studyMode?: string;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      email: "",
      passedExam: false,
      message: "",
    },
  });

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const submitMutation = useMutation({
    mutationFn: async (data: TestimonialFormData) => {
      const response = await apiRequest("POST", "/api/testimonials", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank You!",
        description: "Your testimonial has been submitted for review.",
      });
      form.reset();
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TestimonialFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Success Stories</h1>
          <p className="text-muted-foreground">
            Read testimonials from students who passed the FS exam using our study guide.
          </p>
        </div>

        {/* Submit Button */}
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="lg" data-testid="button-share-story">
            <Star className="h-4 w-4 mr-2" />
            Share Your Success Story
          </Button>
        )}

        {/* Testimonial Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Share Your Success</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} data-testid="input-testimonial-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            data-testid="input-testimonial-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passedExam"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-passed-exam"
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          I passed the FS exam!
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="examScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Score (optional, %)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="85"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : "")}
                            data-testid="input-exam-score"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Study Mode Used (optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-study-mode">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="result-driven">Result-Driven</SelectItem>
                            <SelectItem value="working-professional">Working Professional</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Story</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your experience with the study guide and how it helped you pass..."
                            className="min-h-[150px] resize-none"
                            {...field}
                            data-testid="textarea-testimonial-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-testimonial"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Submit Story"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      data-testid="button-cancel-testimonial"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Testimonials List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Success Stories</h2>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No testimonials yet. Be the first to share!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} data-testid={`testimonial-card-${testimonial.id}`}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          {testimonial.passedExam && (
                            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                              <Star className="h-3 w-3 fill-current" />
                              Passed the FS Exam
                              {testimonial.examScore && ` • ${testimonial.examScore}%`}
                            </div>
                          )}
                        </div>
                        {testimonial.studyMode && (
                          <div className="text-xs bg-muted px-2 py-1 rounded">
                            {testimonial.studyMode}
                          </div>
                        )}
                      </div>
                      <p className="text-muted-foreground">{testimonial.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
