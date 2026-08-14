export class ApiError extends Error {
  public readonly fieldErrors?: Record<string, string>;

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.fieldErrors = fieldErrors;
    this.name = "ApiError";
  }
}

interface CareCircleDraft {
  circleName?: string;
  lovedOneName?: string;
  relationship?: string;
  age?: string;
  gender?: string;
  phone?: string;
  email?: string;
  medication?: string;
  dailyCheckIns?: string;
  photo?: string;
}

interface CareCirclePayload extends CareCircleDraft {}

const storageKey = "__kinGuardCareCircleDraft";

export function getCareCircleDraft(): CareCircleDraft | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CareCircleDraft;
  } catch {
    return null;
  }
}

export function saveCareCircleDraft(draft: CareCircleDraft): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(storageKey, JSON.stringify(draft));
}

export async function createCareCircle(payload: CareCirclePayload): Promise<{ success: true; careCircle: CareCirclePayload }> {
  const draft = getCareCircleDraft();
  const nextDraft = { ...(draft ?? {}), ...payload };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey, JSON.stringify(nextDraft));
  }

  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const token = typeof window !== "undefined" ? (window.localStorage.getItem("__kinGuardServerToken") || undefined) : undefined;

  const res = await fetch(`${API_BASE}/care-circles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "x-session-token": token } : {}),
    },
    body: JSON.stringify(nextDraft),
  });

  const response = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(response?.message ?? "Unable to save your care circle.", response?.fieldErrors);
  }

  return { success: true, careCircle: response?.careCircle ?? nextDraft };
}
