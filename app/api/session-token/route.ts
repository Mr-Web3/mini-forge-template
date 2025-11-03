import { NextRequest, NextResponse } from "next/server";
import { generateJwt } from "@coinbase/cdp-sdk/auth";

/**
 * Extract the true client IP from the request
 * DO NOT trust HTTP headers like X-Forwarded-For - they can be spoofed
 * Extract from the network layer if possible
 */
function getClientIp(request: NextRequest): string {
  // In Next.js, try to get IP from headers if available
  // For production, you should extract from the actual network layer
  // This is a basic implementation - you may need to adjust based on your deployment setup
  
  // Try to get from x-forwarded-for (but validate it's from a trusted proxy)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Take the first IP (the original client IP)
    const ips = forwarded.split(",").map((ip) => ip.trim());
    if (ips.length > 0) {
      return ips[0];
    }
  }
  
  // Fallback to x-real-ip if available
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  
  // If no headers available, use a default (development)
  // In production, you should always get the real IP from your proxy/load balancer
  return "127.0.0.1";
}

/**
 * Generate a JWT Bearer token for CDP API authentication using CDP SDK
 * See: https://docs.cdp.coinbase.com/api-reference/v2/authentication
 * 
 * Uses the @coinbase/cdp-sdk/auth package which handles key formatting internally.
 * When you create a Secret API Key in the CDP Portal, you'll get:
 * - Key ID (use for CDP_KEY_ID)
 * - Private Key (use for CDP_SECRET_KEY) - can be base64 or PEM format, SDK handles it
 */
async function generateJWT(): Promise<string> {
  const secretKey = process.env.CDP_SECRET_KEY;
  const keyId = process.env.CDP_KEY_ID;
  
  if (!secretKey || !keyId) {
    throw new Error("CDP_SECRET_KEY and CDP_KEY_ID must be set in environment variables");
  }
  
  const requestMethod = "POST";
  const requestHost = "api.developer.coinbase.com";
  const requestPath = "/onramp/v1/token";
  
  try {
    // Use the CDP SDK to generate the JWT
    // The SDK handles key formatting internally (supports both base64 and PEM formats)
    const token = await generateJwt({
      apiKeyId: keyId,
      apiKeySecret: secretKey.trim(),
      requestMethod: requestMethod,
      requestHost: requestHost,
      requestPath: requestPath,
      expiresIn: 120, // 2 minutes (120 seconds)
    });
    
    return token;
  } catch (error) {
    // Provide helpful error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("JWT generation error:", errorMessage);
    throw new Error(
      `Failed to generate JWT: ${errorMessage}. ` +
      `Please verify your CDP_SECRET_KEY and CDP_KEY_ID are correct.`
    );
  }
}

/**
 * Generate a session token using the CDP Onramp API
 * POST /api/session-token
 * 
 * Request body (optional):
 * {
 *   "addresses": [{"address": "0x...", "blockchains": ["base"]}],
 *   "assets": ["ETH", "USDC"]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables
    const secretKey = process.env.CDP_SECRET_KEY;
    const keyId = process.env.CDP_KEY_ID;
    
    if (!secretKey || !keyId) {
      return NextResponse.json(
        { error: "CDP_SECRET_KEY and CDP_KEY_ID must be set in environment variables" },
        { status: 500 }
      );
    }
    
    // Get client IP
    const clientIp = getClientIp(request);
    
    // Parse request body
    const body = await request.json().catch(() => ({}));
    const { addresses, assets } = body;
    
    // Generate JWT for authentication using CDP SDK
    const bearerToken = await generateJWT();
    
    // Prepare session token request
    const sessionTokenRequest = {
      addresses: addresses || [
        {
          address: "0x0000000000000000000000000000000000000000", // Placeholder - should be user's address
          blockchains: ["base", "ethereum"],
        },
      ],
      assets: assets || ["ETH", "USDC"],
      clientIp: clientIp,
    };
    
    // Call CDP Session Token API
    const response = await fetch("https://api.developer.coinbase.com/onramp/v1/token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionTokenRequest),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("CDP Session Token API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate session token", details: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      token: data.token,
      channel_id: data.channel_id || "",
    });
  } catch (error) {
    console.error("Error generating session token:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

