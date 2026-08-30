import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Founder Master PIN & Secret purely loaded from Environment Variables (never in git)
const OWNER_PIN = process.env.OWNER_PIN || "";
const AUTH_SECRET = process.env.AUTH_SECRET || "";

// Simple in-memory rate limiter to prevent brute-force attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_PERIOD_MS = 60 * 1000; // 1 minute lockout

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const attemptRecord = loginAttempts.get(ip) || { count: 0, lastAttempt: now };

    // Check if currently locked out
    if (attemptRecord.count >= MAX_ATTEMPTS) {
      if (now - attemptRecord.lastAttempt < LOCKOUT_PERIOD_MS) {
        const remainingSec = Math.ceil((LOCKOUT_PERIOD_MS - (now - attemptRecord.lastAttempt)) / 1000);
        return NextResponse.json(
          {
            success: false,
            message: `Too many failed attempts. Please wait ${remainingSec} seconds before trying again.`,
          },
          { status: 429 }
        );
      } else {
        // Reset after lockout period
        attemptRecord.count = 0;
      }
    }

    const body = await req.json();
    const { pin } = body;

    if (!pin) {
      return NextResponse.json(
        { success: false, message: "Security PIN is required." },
        { status: 400 }
      );
    }

    // Secure timing-safe comparison
    const expectedPinBuffer = Buffer.from(OWNER_PIN);
    const providedPinBuffer = Buffer.from(pin.toString());

    const isMatch =
      expectedPinBuffer.length === providedPinBuffer.length &&
      crypto.timingSafeEqual(expectedPinBuffer, providedPinBuffer);

    if (!isMatch) {
      attemptRecord.count += 1;
      attemptRecord.lastAttempt = now;
      loginAttempts.set(ip, attemptRecord);

      const remaining = MAX_ATTEMPTS - attemptRecord.count;
      return NextResponse.json(
        {
          success: false,
          message:
            remaining > 0
              ? `Incorrect PIN. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
              : "Incorrect PIN. Account locked for 60 seconds.",
        },
        { status: 401 }
      );
    }

    // Reset attempts on successful authentication
    loginAttempts.delete(ip);

    // Generate authenticated session token
    const timestamp = Date.now();
    const hash = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(`owner_session_${timestamp}`)
      .digest("hex");
    const token = `${timestamp}:${hash}`;

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful. Welcome, Founder Sean Casalme.",
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
