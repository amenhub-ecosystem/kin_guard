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

export async function createCareCircle(payload: CareCirclePayload): Promise<{ success: true }> {
  if (typeof window === "undefined") return { success: true };

  const draft = getCareCircleDraft();
  const nextDraft = { ...(draft ?? {}), ...payload };
  window.localStorage.setItem(storageKey, JSON.stringify(nextDraft));

  return { success: true };
}
