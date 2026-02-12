/* eslint-disable no-console */
export const logger = {
  info: (
    message: string,
    context?: { requestId?: string | null; [key: string]: unknown }
  ) => {
    console.log(
      JSON.stringify({
        level: "info",
        message,
        requestId: context?.requestId || "N/A",
        meta: context,
        timestamp: new Date().toISOString(),
      })
    );
  },
  error: (
    message: string,
    context?: { requestId?: string | null; [key: string]: unknown }
  ) => {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        requestId: context?.requestId || "N/A",
        meta: context,
        timestamp: new Date().toISOString(),
      })
    );
  },
};
