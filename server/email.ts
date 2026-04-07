import { Resend } from 'resend';
import { db } from './db';
import { xpGrants } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendStreakReminderEmail(
  to: string,
  userName: string,
  streakDays: number,
  examTrack: string
): Promise<boolean> {
  const client = getResendClient();
  if (!client) {
    console.warn('[email] Resend API key not configured — reminder not sent');
    return false;
  }

  const trackLabel = examTrack === 'ps' ? 'PS (Professional Surveying)' : 'FS (Fundamentals of Surveying)';
  const streakText = streakDays > 0 ? `Your current streak is ${streakDays} day${streakDays !== 1 ? 's' : ''}.` : '';
  const greeting = userName ? `Hi ${userName},` : 'Hi,';
  const appUrl = process.env.REPL_URL || 'https://your-app.replit.app';

  try {
    const { error } = await client.emails.send({
      from: 'Surveying Study Guide <reminders@resend.dev>',
      to: [to],
      subject: streakDays > 0
        ? `Don't break your ${streakDays}-day streak! Study today 📐`
        : 'Time to study — your exam is waiting 📐',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827;">
          <div style="background: #1d4ed8; color: white; padding: 16px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 20px;">📐 Surveying Exam Study Guide</h2>
          </div>
          <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="margin-top: 0;">${greeting}</p>
            <p>You haven't studied today yet for your <strong>${trackLabel}</strong> exam.</p>
            ${streakText ? `<p style="font-size: 18px; color: #ea580c;">🔥 ${streakText} Keep it going!</p>` : ''}
            <p>Even 15 minutes of focused study makes a real difference. Consistent daily practice is the most reliable path to passing on your first try.</p>
            <div style="margin: 28px 0; text-align: center;">
              <a href="${appUrl}"
                 style="background-color: #1d4ed8; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Resume Studying →
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #6b7280; font-size: 13px; margin-bottom: 0;">
              You're receiving this because you opted in to daily study reminders. 
              You can turn them off in <strong>Settings → Notifications</strong>.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[email] Resend error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[email] Failed to send reminder:', err);
    return false;
  }
}

export async function checkAndSendReminder(
  userId: string,
  storage: any
): Promise<void> {
  try {
    const prefs = await storage.getUserPreferences(userId);
    if (!prefs?.reminderEmailEnabled || !prefs?.reminderEmail) return;

    const now = new Date();

    if (prefs.lastReminderSent) {
      const lastSent = new Date(prefs.lastReminderSent);
      const hoursSince = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60);
      if (hoursSince < 20) return;
    }

    const recentGrants = await db
      .select({ createdAt: xpGrants.createdAt })
      .from(xpGrants)
      .where(eq(xpGrants.userId, userId))
      .orderBy(desc(xpGrants.createdAt))
      .limit(1);

    if (recentGrants.length > 0) {
      const lastActivity = new Date(recentGrants[0].createdAt);
      const hoursSince = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
      if (hoursSince < 20) return;
    }

    const user = await storage.getUser(userId);
    const userName = user?.firstName || '';
    const examTrack = prefs.preferredExamTrack || 'fs';

    let streakDays = 0;
    try {
      const streak = await storage.calculateStreak(userId);
      streakDays = streak?.currentStreak || 0;
    } catch {
      streakDays = 0;
    }

    const sent = await sendStreakReminderEmail(prefs.reminderEmail, userName, streakDays, examTrack);

    if (sent) {
      await storage.upsertUserPreferences({
        ...prefs,
        userId,
        lastReminderSent: now,
      });
    }
  } catch (err) {
    console.error('[email] checkAndSendReminder error:', err);
  }
}
