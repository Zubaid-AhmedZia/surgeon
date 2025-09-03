export const runtime = "nodejs";
import { NextResponse } from "next/server";

type Booking = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
};

function detectProvider(url: string): "slack" | "discord" | "generic" {
  if (/hooks\.slack\.com/.test(url)) return "slack";
  if (/discord\.com\/api\/webhooks/.test(url)) return "discord";
  return "generic";
}

async function postToWebhook(url: string, data: Booking, origin?: string) {
  const provider = detectProvider(url);
  let payload: any = data;
  let headers: Record<string, string> = { "Content-Type": "application/json" };

  if (provider === "slack") {
    payload = {
      text: `New consultation request from ${data.name}`,
      blocks: [
        { type: "header", text: { type: "plain_text", text: "New Consultation Request" } },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Name*\n${data.name}` },
            { type: "mrkdwn", text: `*Phone*\n${data.phone}` },
            { type: "mrkdwn", text: `*Email*\n${data.email || "-"}` },
          ],
        },
        { type: "section", text: { type: "mrkdwn", text: `*Message*\n${data.message || "-"}` } },
        { type: "context", elements: [{ type: "mrkdwn", text: `${new Date().toLocaleString()} • ${origin || "site"}` }] },
      ],
    };
  } else if (provider === "discord") {
    payload = {
      content: "New consultation request",
      embeds: [
        {
          title: "Consultation Request",
          color: 0x0f6ea6,
          fields: [
            { name: "Name", value: data.name, inline: true },
            { name: "Phone", value: data.phone, inline: true },
            { name: "Email", value: data.email || "-", inline: false },
            { name: "Message", value: data.message || "-", inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }

  try {
    await fetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  } catch (e) {
    console.error("[BOOKING webhook error]", e);
  }
}

function renderEmailHtml(data: Booking, origin?: string) {
  return `
  <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#0b0f14;color:#f6f4f2;padding:24px">
    <h2 style="margin:0 0 8px 0;font-size:20px">New Consultation Request</h2>
    <p style="opacity:.8;margin:0 0 16px 0">${new Date().toLocaleString()} • ${origin || "site"}</p>
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px;border:1px solid #22303f">Name</td><td style="padding:8px;border:1px solid #22303f">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #22303f">Phone</td><td style="padding:8px;border:1px solid #22303f">${data.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #22303f">Email</td><td style="padding:8px;border:1px solid #22303f">${data.email || "-"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #22303f">Message</td><td style="padding:8px;border:1px solid #22303f">${(data.message || "-").replace(/</g, "&lt;")}</td></tr>
    </table>
  </div>`;
}

async function notifyEmail(data: Booking, origin?: string) {
  const emailTo = process.env.EMAIL_TO;
  if (!emailTo) return; // nothing to do

  // Prefer SMTP if configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = await import("nodemailer").then((m) => m.default).catch(() => null);
      if (!nodemailer) throw new Error("nodemailer not installed");
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
        auth: { user: process.env.SMTP_USER as string, pass: process.env.SMTP_PASS as string },
      });
      const from = process.env.EMAIL_FROM || process.env.SMTP_USER as string;
      await transport.sendMail({
        from,
        to: emailTo,
        subject: `New Consultation Request — ${data.name}`,
        text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "-"}\nMessage: ${data.message || "-"}\nWhen: ${new Date().toLocaleString()}\nSource: ${origin || "site"}`,
        html: renderEmailHtml(data, origin),
      });
      return;
    } catch (e) {
      console.error("[BOOKING email SMTP]", e);
    }
  }

  // Fallback to Resend API if available
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "notifications@resend.dev",
          to: emailTo,
          subject: `New Consultation Request — ${data.name}`,
          html: renderEmailHtml(data, origin),
        }),
      });
      if (!res.ok) {
        console.error("[BOOKING email RESEND] status", res.status);
      }
    } catch (e) {
      console.error("[BOOKING email RESEND]", e);
    }
  }
}

export async function POST(req: Request) {
  try {
    const ctype = req.headers.get("content-type") || "";
    let name: string | undefined, phone: string | undefined, email: string | undefined, message: string | undefined, honeypot: string | undefined;
    let isForm = true;
    if (ctype.includes("application/json")) {
      const body = await req.json();
      ({ name, phone, email, message } = body || ({} as any));
      isForm = false;
    } else {
      const fd = await req.formData();
      name = String(fd.get("name") || "");
      phone = String(fd.get("phone") || "");
      email = (fd.get("email") as string) || undefined;
      message = (fd.get("message") as string) || undefined;
      honeypot = (fd.get("company") as string) || undefined; // spam trap
    }

    if (honeypot) {
      // Silently accept spammy submissions
      if (isForm) return NextResponse.redirect(new URL("/thank-you", req.url), 303);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
    }

    if (!name || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), { status: 400 });
    }

    const payload = { name, phone, email, message } as Booking;
    const origin = new URL(req.url).origin;
    const webhook = process.env.BOOKING_WEBHOOK_URL;
    if (webhook) await postToWebhook(webhook, payload, origin);
    await notifyEmail(payload, origin);
    if (!webhook && !process.env.EMAIL_TO) {
      console.log("[BOOKING]", payload);
    }

    if (isForm) {
      return NextResponse.redirect(new URL("/thank-you", req.url), 303);
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || "Unknown error" }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
