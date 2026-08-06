type OTPInputProps = {
  value?: string[];
  length?: number;
};

export function OTPInput({
  value = ["4", "8", "2", "", "", ""],
  length = 6,
}: OTPInputProps) {
  return (
    <div className="flex justify-between gap-5">
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className="flex h-14 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F8FAFC]"
        >
          <span
            className={`text-[20px] font-bold ${
              value[i]
                ? "text-[#1B2A4A]"
                : "text-[#9CA3AF]"
            }`}
          >
            {value[i] || "-"}
          </span>
        </div>
      ))}
    </div>
  );
}