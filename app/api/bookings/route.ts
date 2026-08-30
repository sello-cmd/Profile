import { NextRequest, NextResponse } from "next/server";
import { getBookingsAsync, createBookingAsync, getBookedSlotsAsync } from "@/lib/db";

// GET /api/bookings - List all bookings & booked slots
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    const bookings = await getBookingsAsync();
    const bookedSlots = await getBookedSlotsAsync(dateParam || undefined);

    return NextResponse.json({
      success: true,
      data: bookings,
      bookedSlots,
      total: bookings.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings from database" },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create new booking with conflict prevention
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, type, date, time, platform, notes } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { success: false, message: "Name, email, date, and time are required" },
        { status: 400 }
      );
    }

    const savedBooking = await createBookingAsync({
      name: name.trim(),
      email: email.trim(),
      type: type || "15-Min Intro & Discovery Call",
      date,
      time,
      platform: platform || "Google Meet",
      notes: notes ? notes.trim() : "",
    });

    if (!savedBooking) {
      return NextResponse.json(
        {
          success: false,
          message: `The slot for ${date} at ${time} is already booked by another attendee. Please choose an available time slot.`,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consultation booked and saved to database successfully!",
        data: savedBooking,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error creating booking", error: error?.message },
      { status: 500 }
    );
  }
}
