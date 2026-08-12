export interface CareCircleDraft {
  circleName: string;
  lovedOneName: string;
  relationship: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  medication: string;
  dailyCheckIns: string;
  photo?: string;
}

const storageKey = "kinGuardCareCircleDraft";

export function saveCareCircleDraft(draft: CareCircleDraft) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(storageKey, JSON.stringify(draft));
  }
}

export function getCareCircleDraft() {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CareCircleDraft;
  } catch {
    return null;
  }
}

export function clearCareCircleDraft() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(storageKey);
  }
}
