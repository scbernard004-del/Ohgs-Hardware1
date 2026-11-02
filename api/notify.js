const nodemailer = require("nodemailer");

function clean(value, max = 1200) {
  if (value === undefined || value === null) return "";
  return String(value).replace(/[<>]/g, "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function cleanMessage(value, max = 2000) {
  if (value === undefined || value === null) return "";
  return String(value).replace(/[<>]/g, "").trim().slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > 12_000) return res.status(413).json({ ok: false, error: "Request too large" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ ok: false, error: "Invalid request" });
    }

    // Quietly accept bot submissions without sending email.
    if (clean(body.website || "", 200)) return res.status(200).json({ ok: true });

    const eventType = clean(body.eventType || "website_interaction", 80);
    const page = clean(body.page || "", 250);
    const product = clean(body.product || "", 250);
    const action = clean(body.action || "", 250);
    const name = clean(body.name || "", 150);
    const phone = clean(body.phone || "", 150);
    const email = clean(body.email || "", 150);
    const message = cleanMessage(body.message || "", 2000);
    const userAgent = clean(req.headers["user-agent"] || "", 400);
    const createdAt = new Date().toLocaleString("en-GB", { timeZone: "Africa/Dar_es_Salaam" });

    if (eventType === "form_submission" && (name.length < 2 || phone.length < 9 || message.length < 5)) {
      return res.status(400).json({ ok: false, error: "Please complete the required fields" });
    }

    if (email && !validEmail(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: requiredEnv("SMTP_HOST"),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: requiredEnv("SMTP_USER"),
        pass: requiredEnv("SMTP_PASS")
      }
    });

    const toEmail = requiredEnv("NOTIFY_TO_EMAIL");
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;

    const subject =
      eventType === "order_click"
        ? `OHGS Order Interest: ${product || action || "New customer"}`
        : `OHGS Website Notification: ${action || eventType}`;

    const text = [
      "New OHGS website notification",
      "",
      `Time: ${createdAt}`,
      `Type: ${eventType}`,
      `Action: ${action || "-"}`,
      `Product/Service: ${product || "-"}`,
      `Page: ${page || "-"}`,
      "",
      "Customer details:",
      `Name: ${name || "-"}`,
      `Phone: ${phone || "-"}`,
      `Email: ${email || "-"}`,
      "",
      "Message:",
      message || "-",
      "",
      "Technical:",
      `User Agent: ${userAgent || "-"}`
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
        <h2 style="margin:0 0 12px;color:#0b2a4a">New OHGS Website Notification</h2>
        <table style="border-collapse:collapse;width:100%;max-width:680px">
          ${[
            ["Time", createdAt],
            ["Type", eventType],
            ["Action", action || "-"],
            ["Product/Service", product || "-"],
            ["Page", page || "-"],
            ["Name", name || "-"],
            ["Phone", phone || "-"],
            ["Customer Email", email || "-"],
            ["Message", message || "-"]
          ].map(([k,v]) => `
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold;background:#f8fafc;width:160px">${k}</td>
              <td style="padding:8px;border:1px solid #e2e8f0">${String(v).replace(/\n/g, "<br>")}</td>
            </tr>
          `).join("")}
        </table>
        <p style="margin-top:16px;color:#475569;font-size:13px">This email was sent by the OHGS website notification system.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"OHGS Website" <${fromEmail}>`,
      to: toEmail,
      replyTo: validEmail(email) ? email : undefined,
      subject,
      text,
      html
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("OHGS notification error:", error);
    return res.status(500).json({ ok: false, error: "Notification failed" });
  }
};
