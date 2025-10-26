import { useCallback } from 'react';

export function useActivityLogger() {
  const logActivity = useCallback(async (activityType: string) => {
    try {
      await fetch('/api/activity/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ activityType }),
      });
    } catch (error) {
      // Silently fail - activity logging shouldn't interrupt user experience
      console.error('Failed to log activity:', error);
    }
  }, []);

  return { logActivity };
}
