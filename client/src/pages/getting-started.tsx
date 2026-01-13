import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { ExamSelector } from "@/components/exam-selector";
import { GraduationCap } from "lucide-react";

export default function GettingStarted() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth/user'],
  });
  
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-9 w-9" />
            </div>
          </div>
          <h1 className="text-4xl font-bold" data-testid="text-page-title">
            Choose Your Exam Path
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the exam you're preparing for. Each exam track includes specialized study materials, practice questions, and domain-specific content tailored to help you succeed.
          </p>
        </div>

        {isLoggedIn && (
          <Card className="p-6" data-testid="card-exam-selector">
            <ExamSelector />
          </Card>
        )}

        {!isLoggedIn && (
          <Card className="p-6 text-center" data-testid="card-login-prompt">
            <p className="text-muted-foreground">
              Please log in to select your exam path and access your personalized study materials.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
