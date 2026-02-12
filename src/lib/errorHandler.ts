import { NextResponse } from "next/server";
import { logger } from "./logger";

export function handleError(
  error: unknown,
  context: string,
  requestId?: string | null
) {
  const isProd = process.env.NODE_ENV === "production";
  const err = error instanceof Error ? error : new Error(String(error));

  const errorResponse = {
    success: false,
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message || "Unknown error",
    ...(isProd ? {} : { stack: err.stack }),
    requestId, // Include Request ID in the API response as well
  };

  logger.error(`Error in ${context}`, {
    message: err.message,
    stack: isProd ? "REDACTED" : err.stack,
    requestId,
  });

  return NextResponse.json(errorResponse, { status: 500 });
}
