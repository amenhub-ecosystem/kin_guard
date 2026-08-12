import { useEffect, useMemo, useRef, useState } from "react";

interface PasswordStrengthProps {
  password?: string;
  /** Values that should not appear inside the password, e.g. email/name. */
  disallowedValues?: string[];
  /** Show the live password requirements. Defaults to true. */
  showChecklist?: boolean;
  className?: string;
}

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

interface StrengthResult {
  level: StrengthLevel;
  label: string;
  color: string;
  textColor: string;
  feedback: string | null;
}

const LEVEL_META: Record<
  StrengthLevel,
  {
    label: string;
    color: string;
    textColor: string;
  }
> = {
  0: {
    label: "Very weak",
    color: "#DC2626",
    textColor: "#B91C1C",
  },
  1: {
    label: "Weak",
    color: "#F97316",
    textColor: "#C2410C",
  },
  2: {
    label: "Fair",
    color: "#EAB308",
    textColor: "#A16207",
  },
  3: {
    label: "Good",
    color: "#3B82F6",
    textColor: "#2563EB",
  },
  4: {
    label: "Strong",
    color: "#22C55E",
    textColor: "#15803D",
  },
};

const COMMON_PASSWORDS = new Set([
  "password",
  "password1",
  "password123",
  "12345678",
  "123456789",
  "qwerty",
  "qwerty123",
  "qwertyuiop",
  "letmein",
  "welcome",
  "welcome1",
  "admin",
  "admin123",
  "iloveyou",
  "monkey123",
  "football1",
  "dragon123",
  "master123",
  "sunshine1",
  "princess1",
  "trustno1",
  "abc123456",
  "passw0rd",
]);

const SEQUENTIAL_RUNS = [
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];

function hasSequentialRun(value: string, minRun = 4) {
  const lower = value.toLowerCase();

  for (const sequence of SEQUENTIAL_RUNS) {
    for (let i = 0; i <= sequence.length - minRun; i++) {
      const chunk = sequence.slice(i, i + minRun);
      const reversed = [...chunk].reverse().join("");

      if (lower.includes(chunk) || lower.includes(reversed)) {
        return true;
      }
    }
  }

  return false;
}

function hasRepeatedRun(value: string, minRun = 4) {
  let count = 1;

  for (let i = 1; i < value.length; i++) {
    count = value[i] === value[i - 1] ? count + 1 : 1;

    if (count >= minRun) {
      return true;
    }
  }

  return false;
}

function containsDisallowedValue(
  password: string,
  values: string[],
) {
  const lowerPassword = password.toLowerCase();

  return values.some((value) => {
    const normalized = value.trim().toLowerCase();

    return (
      normalized.length >= 3 &&
      lowerPassword.includes(normalized)
    );
  });
}

function evaluatePassword(
  password: string,
  disallowedValues: string[],
): StrengthResult {
  if (!password) {
    return {
      level: 0,
      label: "",
      color: LEVEL_META[0].color,
      textColor: LEVEL_META[0].textColor,
      feedback: null,
    };
  }

  const lower = password.toLowerCase();

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const variety = [
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
  ].filter(Boolean).length;

  const isCommon = COMMON_PASSWORDS.has(lower);
  const isDisallowed = containsDisallowedValue(
    password,
    disallowedValues,
  );
  const isSequential = hasSequentialRun(password);
  const isRepeated = hasRepeatedRun(password);

  /*
   * Known-bad passwords should never appear strong,
   * regardless of character variety.
   */
  if (isCommon) {
    return {
      level: 0,
      label: LEVEL_META[0].label,
      color: LEVEL_META[0].color,
      textColor: LEVEL_META[0].textColor,
      feedback:
        "This password is too common. Choose something more unique.",
    };
  }

  if (isDisallowed) {
    return {
      level: 0,
      label: LEVEL_META[0].label,
      color: LEVEL_META[0].color,
      textColor: LEVEL_META[0].textColor,
      feedback:
        "Avoid using your name or email in your password.",
    };
  }

  /*
   * Length carries more weight than complexity.
   */
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 20) score += 1;

  /*
   * Character variety gives additional points,
   * but cannot compensate for a short password.
   */
  if (variety >= 2) score += 1;
  if (variety >= 3) score += 1;
  if (variety >= 4) score += 1;

  /*
   * Penalize predictable structures.
   */
  if (isSequential) score -= 2;
  if (isRepeated) score -= 2;

  /*
   * Short passwords cannot become "strong"
   * simply by adding symbols.
   */
  if (password.length < 8) {
    score = Math.min(score, 1);
  }

  const level = Math.max(
    0,
    Math.min(4, score),
  ) as StrengthLevel;

  const meta = LEVEL_META[level];

  let feedback: string | null = null;

  if (isSequential) {
    feedback =
      'Avoid predictable sequences like "abcd" or "1234".';
  } else if (isRepeated) {
    feedback =
      "Avoid repeating the same character several times.";
  } else if (password.length < 8) {
    feedback =
      "Use at least 8 characters — longer is better.";
  } else if (variety < 3) {
    feedback =
      "Add uppercase letters, numbers, or symbols.";
  } else if (password.length < 12) {
    feedback =
      "Try making it longer for better protection.";
  } else if (level === 4) {
    feedback = "Great — this is a strong password.";
  }

  return {
    level,
    label: meta.label,
    color: meta.color,
    textColor: meta.textColor,
    feedback,
  };
}

export function PasswordStrength({
  password = "",
  disallowedValues = [],
  showChecklist = true,
  className = "",
}: PasswordStrengthProps) {
  const result = useMemo(
    () =>
      evaluatePassword(
        password,
        disallowedValues,
      ),
    [password, disallowedValues],
  );

  const [announcement, setAnnouncement] =
    useState("");

  const announcementTimer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  useEffect(() => {
    if (announcementTimer.current) {
      clearTimeout(announcementTimer.current);
    }

    if (!password) {
      setAnnouncement("");
      return;
    }

    announcementTimer.current = setTimeout(() => {
      const message = result.feedback
        ? `Password strength: ${result.label}. ${result.feedback}`
        : `Password strength: ${result.label}.`;

      setAnnouncement(message);
    }, 600);

    return () => {
      if (announcementTimer.current) {
        clearTimeout(announcementTimer.current);
      }
    };
  }, [
    password,
    result.label,
    result.feedback,
  ]);

  const checklist = useMemo(
    () => [
      {
        key: "length",
        label: "At least 8 characters",
        met: password.length >= 8,
      },
      {
        key: "case",
        label: "Upper & lowercase letters",
        met:
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password),
      },
      {
        key: "number",
        label: "At least one number",
        met: /\d/.test(password),
      },
      {
        key: "symbol",
        label: "At least one symbol",
        met: /[^A-Za-z0-9]/.test(password),
      },
    ],
    [password],
  );

  const isEmpty = password.length === 0;

  return (
    <div
      className={`flex flex-col gap-2 ${className}`}
    >
      {/* Strength meter */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((bar) => {
          const isActive =
            !isEmpty && bar <= result.level;

          return (
            <div
              key={bar}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]"
            >
              <div
                className="h-full rounded-full transition-[width,background-color] duration-300 ease-out"
                style={{
                  width: isActive ? "100%" : "0%",
                  backgroundColor: isActive
                    ? result.color
                    : "transparent",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Label */}
      <div className="flex min-h-4 items-center justify-between">
        <span
          className="text-[11px] font-medium transition-colors duration-300"
          style={{
            color: isEmpty
              ? "#9CA3AF"
              : result.textColor,
          }}
        >
          {isEmpty
            ? "Enter a password"
            : result.label}
        </span>

        {!isEmpty && (
          <span className="text-[11px] text-[#9CA3AF]">
            {result.level}/4
          </span>
        )}
      </div>

      {/* Smart feedback */}
      {!isEmpty && result.feedback && (
        <p className="text-xs leading-[18px] text-[#6B7280]">
          {result.feedback}
        </p>
      )}

      {/* Requirements */}
      {showChecklist && !isEmpty && (
        <ul
          className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2"
          aria-label="Password requirements"
        >
          {checklist.map((item) => (
            <li
              key={item.key}
              className="flex items-center gap-1.5"
            >
              <span
                className={[
                  "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full",
                  "transition-all duration-200",
                  item.met
                    ? "bg-[#22C55E]"
                    : "bg-[#E5E7EB]",
                ].join(" ")}
                aria-hidden="true"
              >
                {item.met && (
                  <svg
                    viewBox="0 0 12 12"
                    className="h-2 w-2 fill-none stroke-white stroke-[2]"
                  >
                    <path
                      d="M2.5 6.5L4.75 8.75L9.5 3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>

              <span
                className={[
                  "text-xs transition-colors duration-200",
                  item.met
                    ? "text-[#374151]"
                    : "text-[#9CA3AF]",
                ].join(" ")}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Screen reader announcement */}
      <span
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </span>
    </div>
  );
}