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
  const handleChange = (index: number, nextValue: string) => {
    const sanitized = nextValue.replace(/\D/g, "").slice(0, 1);
    const nextDigits = [...value];
    nextDigits[index] = sanitized;
    onChange?.(nextDigits);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-2 sm:gap-3">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={value[i] ?? ""}
            onChange={(event) => handleChange(i, event.target.value)}
            className="h-14 w-12 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-center text-[20px] font-bold text-[#1B2A4A] outline-none transition focus:border-[#003665] focus:ring-2 focus:ring-[#003665]/10"
          />
        ))}
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}