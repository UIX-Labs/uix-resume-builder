import { type NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

// Whitelist of allowed domains for security
const ALLOWED_DOMAINS = [
  "uix-resume-builder.s3.ap-south-1.amazonaws.com",
  // Add other trusted domains here
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  try {
    // 1. VALIDATE URL FORMAT
    let urlObj: URL;
    try {
      urlObj = new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // 2. WHITELIST ALLOWED DOMAINS
    const isAllowedDomain = ALLOWED_DOMAINS.some(
      (domain) =>
        urlObj.hostname.includes(domain) || urlObj.hostname.endsWith(domain)
    );

    if (!isAllowedDomain) {
      console.warn(
        `Blocked request to unauthorized domain: ${urlObj.hostname}`
      );
      return NextResponse.json(
        {
          error: "Domain not allowed",
          allowedDomains: ALLOWED_DOMAINS,
        },
        { status: 403 }
      );
    }

    // 3. FETCH THE IMAGE
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status }
      );
    }

    // 4. VALIDATE CONTENT TYPE
    const contentType = response.headers.get("content-type");

    if (!contentType?.startsWith("image/")) {
      console.warn(`Blocked non-image content type: ${contentType}`);
      return NextResponse.json(
        {
          error: "Invalid content type. Only images are allowed",
        },
        { status: 400 }
      );
    }

    // 5. VALIDATE FILE SIZE
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const contentLength = response.headers.get("content-length");

    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      console.warn(`Blocked oversized file: ${contentLength} bytes`);
      return NextResponse.json(
        {
          error: "File too large. Maximum size is 10MB",
        },
        { status: 413 }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();

    // Double-check buffer size (in case content-length header was missing)
    if (imageBuffer.byteLength > MAX_SIZE) {
      console.warn(`Blocked oversized buffer: ${imageBuffer.byteLength} bytes`);
      return NextResponse.json(
        {
          error: "File too large. Maximum size is 10MB",
        },
        { status: 413 }
      );
    }

    // Return the image with proper CORS headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    );
  }
}
