import { NextRequest, NextResponse } from "next/server";
import { minikitConfig } from "../../../minikit.config";

/**
 * Webhook endpoint to handle Farcaster Mini App events
 * 
 * Farcaster sends events to this endpoint when certain actions occur:
 * - miniapp_removed: When a user removes the mini app from their Farcaster client
 * 
 * The webhook URL is specified in the farcaster.json manifest file
 * and should match the webhookUrl in minikit.config.ts
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event } = body;

    console.log("Webhook received:", event);

    // Handle different event types
    switch (event) {
      case "miniapp_removed":
        // User removed the mini app from their Farcaster client
        console.log("Mini app removed by user");
        
        // You can perform cleanup tasks here, such as:
        // - Clearing user data
        // - Notifying other services
        // - Logging analytics
        
        // Example: Log removal event
        // await logUserEvent({ type: 'miniapp_removed', timestamp: Date.now() });
        
        return NextResponse.json(
          { success: true, message: "Mini app removal handled" },
          { status: 200 }
        );

      default:
        console.log("Unknown event type:", event);
        return NextResponse.json(
          { success: true, message: "Event received but not handled" },
          { status: 200 }
        );
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for webhook verification (if needed)
 */
export async function GET() {
  // Some webhook providers require GET endpoints for verification
  // You can implement verification logic here if Farcaster requires it
  return NextResponse.json({
    webhook: "active",
    webhookUrl: minikitConfig.miniapp.webhookUrl,
  });
}

