import { Resend } from "resend";
import WaitlistConfirmationEmail from "./waitlist-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistConfirmationEmail(email: string) {
  try {
    await resend.emails.send({
      from: "PRYDD <onboarding@prydd.co>",
      to: email,
      subject: "Welcome to the Waitlist - PRYDD",
      react: WaitlistConfirmationEmail({ email }),
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    // Silently fail - don't block user experience
  }
}
