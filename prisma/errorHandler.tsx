import { NextResponse } from "next/server";
import { logger } from "./logger";

export function handleError(error: unknown, context: string) {
  const isProd = process.env.NODE_ENV === "production";
  const err = error instanceof Error ? error : new Error(String(error));

  const errorResponse = {
    success: false,
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message || "Unknown error",
    ...(isProd ? {} : { stack: err.stack }),
  };

  logger.error(`Error in ${context}`, {
    message: err.message,
    stack: isProd ? "REDACTED" : err.stack,
  });

  return NextResponse.json(errorResponse, { status: 500 });
}