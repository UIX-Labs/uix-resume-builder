import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetch } from "@shared/api";
import type { ParsePdfResponse } from "../types";
import * as Sentry from "@sentry/nextjs";

export async function parsePdfResume(file: File): Promise<ParsePdfResponse> {
  try {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(
        `File size (${(file.size / 1024 / 1024).toFixed(
          2
        )}MB) exceeds the maximum limit of 10MB.`
      );
    }

    const formData = new FormData();
    formData.append("file", file);

    const data = await fetch<ParsePdfResponse>("resume/parse-pdf", {
      options: {
        method: "POST",
        body: formData,
        headers: {},
        credentials: "include",
      },
    });

    return data;
  } catch (error) {
    console.error("Error parsing PDF resume:", error);
    Sentry.captureException(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to parse PDF resume. Please try again."
    );
  }
}
