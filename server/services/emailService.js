import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// Isolated SMTP layer. Nothing in this file knows about auth, users,
// or tokens — it exposes one generic primitive so the delivery
// mechanism (currently Gmail SMTP) can be swapped for Resend/SES later
// without touching authService.js or authController.js.

let transporter = null;

function isConfigured() {
  return Boolean(env.EMAIL_USER && env.EMAIL_APP_PASSWORD);
}

// Lazily initialized, same reasoning as geminiClient.js's getClient():
// a missing/invalid credential should only disable email sending, not
// crash the whole API at boot.
function getTransporter() {
  if (!isConfigured()) {
    throw new Error("Email is not configured. Missing EMAIL_USER or EMAIL_APP_PASSWORD.");
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_APP_PASSWORD, // Gmail App Password — never the account password
      },
    });
  }
  return transporter;
}

/**
 * @param {{ to: string, subject: string, html: string, text: string }} message
 * @returns {Promise<void>}
 */
export async function sendEmail({ to, subject, html, text }) {
  if (!isConfigured()) {
    console.warn(`[emailService] Skipped sending "${subject}" to ${to} — email not configured.`);
    return;
  }

  const fromName = env.EMAIL_FROM_NAME || "PrepPilot";
  const transport = getTransporter();

  await transport.sendMail({
    from: `"${fromName}" <${env.EMAIL_USER}>`,
    to,
    subject,
    html,
    text,
  });
}