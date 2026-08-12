import type { ButtonHTMLAttributes } from "react";

interface AuthButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export function AuthButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: AuthButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-[#003665] text-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:bg-[#002d56]"
      : "border-2 border-[#FE706D] bg-white text-[#FE706D] hover:bg-[#FFF7F7]";

  return (
    <button
      type={type}
      className={`
        flex h-[60px] w-full items-center justify-center
        rounded-2xl px-4 py-[14px]
        font-inter text-base font-bold leading-6
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-[#003665] focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}