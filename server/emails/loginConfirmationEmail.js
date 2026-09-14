// Content only — no delivery mechanics here. Deliberately accepts a
// narrow, explicit set of fields so it is structurally impossible to
// pass a password/token/secret into an email by accident.

// name/email are user-controlled (User.name, User.email) and are
// interpolated into HTML below, so they must be escaped to prevent
// HTML/markup injection in email clients that render HTML. The plain
// text version has no such risk and is left as-is.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * @param {{ name: string, email: string, timestamp: Date }} params
 * @returns {{ subject: string, html: string, text: string }}
 */
export function buildLoginConfirmationEmail({ name, email, timestamp }) {
  const formattedTime = timestamp.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = "You just signed in to PrepPilot";

  const text = `Hi ${name},

Thanks for signing in to PrepPilot.

Account: ${email}
Sign-in time: ${formattedTime}

If this was you, no action is needed. If you don't recognize this activity, we recommend changing your password as soon as possible.

— The PrepPilot Team`;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
      <h2 style="margin: 0 0 4px; font-size: 18px;">PrepPilot</h2>
      <p style="margin: 0 0 20px; color: #6b6b6b; font-size: 13px;">Placement preparation, tracked in one place.</p>

      <p style="font-size: 14px; line-height: 1.6;">Hi ${safeName},</p>
      <p style="font-size: 14px; line-height: 1.6;">Thanks for signing in to <strong>PrepPilot</strong>.</p>

      <table style="width: 100%; margin: 16px 0; font-size: 13px; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #6b6b6b;">Account</td>
          <td style="padding: 6px 0; text-align: right;">${safeEmail}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b6b6b;">Sign-in time</td>
          <td style="padding: 6px 0; text-align: right;">${formattedTime}</td>
        </tr>
      </table>

      <p style="font-size: 13px; line-height: 1.6; color: #6b6b6b;">
        If this was you, no action is needed. If you don't recognize this activity,
        we recommend changing your password as soon as possible.
      </p>

      <p style="margin-top: 24px; font-size: 12px; color: #999;">— The PrepPilot Team</p>
    </div>
  `;

  return { subject, html, text };
}