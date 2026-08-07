import { useRef, type KeyboardEvent } from "react";

type OTPInputProps = {
  value?: string[];
  length?: number;
  onChange?: (value: string[]) => void;
  error?: string;
};

export function OTPInput({
  value = ["", "", "", "", "", ""],
  length = 6,
  onChange,
  error,
}: OTPInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const updateValue = (index: number, nextValue: string) => {
    const nextDigits = [...value];
    nextDigits[index] = nextValue;
    onChange?.(nextDigits);
  };

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
    inputsRef.current[index]?.select();
  };

  const handleChange = (index: number, nextValue: string) => {
    const sanitized = nextValue.replace(/\D/g, "");

    if (!sanitized) {
      updateValue(index, "");
      return;
    }

    if (sanitized.length > 1) {
      const digits = sanitized.slice(0, length).split("");
      const nextDigits = [...value];
      digits.forEach((digit, offset) => {
        const targetIndex = index + offset;
        if (targetIndex < length) {
          nextDigits[targetIndex] = digit;
        }
      });
      onChange?.(nextDigits);
      const nextIndex = Math.min(index + digits.length, length - 1);
      focusInput(nextIndex);
      return;
    }

    updateValue(index, sanitized);
    if (index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (value[index]) {
        const nextDigits = [...value];
        nextDigits[index] = "";
        onChange?.(nextDigits);
        return;
      }

      if (index > 0) {
        const nextDigits = [...value];
        nextDigits[index - 1] = "";
        onChange?.(nextDigits);
        focusInput(index - 1);
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (!pastedValue) {
      return;
    }

    const nextDigits = [...value];
    pastedValue.split("").forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    onChange?.(nextDigits);
    const nextIndex = Math.min(pastedValue.length, length - 1);
    focusInput(nextIndex);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-2 sm:gap-3">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(element) => {
              inputsRef.current[i] = element;
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={value[i] ?? ""}
            onChange={(event) => handleChange(i, event.target.value)}
            onKeyDown={(event) => handleKeyDown(i, event)}
            onPaste={handlePaste}
            className="h-14 w-12 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-center text-[20px] font-bold text-[#1B2A4A] outline-none transition focus:border-[#003665] focus:ring-2 focus:ring-[#003665]/10"
          />
        ))}
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}