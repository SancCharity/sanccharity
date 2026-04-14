/**
 * CharityApiClient
 *
 * The single import point for all API calls in the app.
 *
 * In PREVIEW_MODE (NEXT_PUBLIC_PREVIEW_MODE=true) every method delegates to
 * MockApiClient so the app works without a live backend.
 *
 * When the real FastAPI backend is ready:
 *   1. Set NEXT_PUBLIC_PREVIEW_MODE=false
 *   2. Set NEXT_PUBLIC_API_URL=https://api.sanccharity.io
 *   3. The RealApiClient below will handle all calls — zero component changes.
 */

import { PREVIEW_MODE } from "@/lib/constants";
import { mockApiClient, MockApiClient } from "./mockApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Real API Client (stub — fill in when backend is ready) ──────────────────

class RealApiClient {
  private async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    const url = new URL(`${API_URL}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) url.searchParams.set(k, String(v));
      });
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
    return res.json();
  }

  private async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
    return res.json();
  }

  private async put<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
    return res.json();
  }

  // Delegates to mock until real implementation is needed
  // Add real fetch calls here when the backend is live
}

// ─── Export ───────────────────────────────────────────────────────────────────

/**
 * The active API client. Import this everywhere — never import MockApiClient directly.
 *
 * Usage: `import { charityApi } from "@/services/charityApi"`
 */
export const charityApi: MockApiClient = PREVIEW_MODE
  ? mockApiClient
  : (new RealApiClient() as unknown as MockApiClient);

export type CharityApi = typeof charityApi;
