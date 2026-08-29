import { NextRequest, NextResponse } from "next/server";
import { InquiryFormSchema } from "@/types/portfolio";
import { Resend } from "resend";
import { getInquiries, createInquiry } from "@/lib/db";

// Optional: Resend API initialization
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "casalmeseanlloyd@gmail.com";

// GET /api/inquire - Fetch all inquiries from database
export async function GET() {
  try {
    const inquiries = getInquiries();
    return NextResponse.json({
      success: true,
      data: inquiries,
      total: inquiries.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries from database" },
      { status: 500 }
    );
  }
}

// POST /api/inquire - Create new inquiry in database & send notification
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validationResult = InquiryFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check the required fields.",
          error: errorFormatted,
        },
        { status: 400 }
      );
    }

    const { fullName, email, company, handle, projectTypes, budget, timeline, scope } =
      validationResult.data;

    // 2. Persist to Database
    const savedInquiry = createInquiry({
      fullName,
      email,
      company,
      handle,
      projectTypes,
      budget,
      timeline,
      scope,
    });

    // 3. Dispatch Email Notification via Resend (or Dev Mode Fallback)
    const emailSubject = `🚀 New Project Inquiry from ${fullName} [${budget}]`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0c0c0e; color: #f4f4f5; border-radius: 16px; border: 1px solid #27272a;">
        <h2 style="color: #ffffff; border-bottom: 1px solid #27272a; padding-bottom: 12px; margin-top: 0;">New Project Inquiry</h2>
        <div style="margin: 16px 0;">
          <p><strong>Client Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #ffffff;">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${handle ? `<p><strong>Handle / Contact:</strong> ${handle}</p>` : ""}
          <p><strong>Budget Range:</strong> ${budget}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <p><strong>Project Types:</strong> ${projectTypes.join(", ")}</p>
        </div>
        <div style="background: #000000; padding: 16px; border-radius: 12px; border: 1px solid #27272a; margin-top: 20px;">
          <p style="margin-top: 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; font-family: monospace;">Project Scope & Brief:</p>
          <p style="white-space: pre-wrap; line-height: 1.6; margin-bottom: 0;">${scope}</p>
        </div>
        <p style="margin-top: 24px; font-size: 11px; color: #71717a; border-top: 1px solid #27272a; padding-top: 12px;">
          Saved to Database ID: ${savedInquiry.id} • Dispatched via Sean Casalme Portfolio Platform
        </p>
      </div>
    `;

    if (resend) {
      await resend.emails.send({
        from: "Sean Portfolio <inquiries@resend.dev>",
        to: NOTIFICATION_EMAIL,
        subject: emailSubject,
        html: emailHtml,
        replyTo: email,
      });
    } else {
      console.log("================ NEW INQUIRY SAVED TO DATABASE ================");
      console.log(JSON.stringify(savedInquiry, null, 2));
      console.log("===============================================================");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received and saved to database! I will review your requirements and reach out within 24 hours.",
        data: savedInquiry,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while saving your inquiry. Please try again or reach out directly.",
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
