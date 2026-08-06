interface PasswordStrengthProps {
  strength?: "weak" | "medium" | "strong";
}

export function PasswordStrength({
  strength = "strong",
}: PasswordStrengthProps) {
  const activeBars =
    strength === "weak"
      ? 1
      : strength === "medium"
      ? 2
      : 3;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`h-1.5 flex-1 rounded-full ${
            bar <= activeBars
              ? "bg-[#22C55E]"
              : "bg-[#E5E7EB]"
          }`}
        />
      ))}

      <span className="ml-1 text-[11px] font-medium text-[#16A34A]">
        {strength.charAt(0).toUpperCase() + strength.slice(1)}
      </span>
    </div>
  );
}