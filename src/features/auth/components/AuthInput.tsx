import { useState, type ReactNode } from "react";
import {
  User,
  Mail,
  Lock,
  CircleCheck,
  Eye,
  EyeOff,
} from "@/components/common/icons";

interface AuthInputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  icon?: "user" | "mail" | "lock" | "check";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  value?: string;
  name?: string;
  id?: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function AuthInput({
  label,
  placeholder,
  type = "text",
  icon,
  leftIcon,
  rightIcon,
  value,
  name,
  id,
  error,
  onChange,
  onBlur,
  autoComplete,
  required,
  disabled,
  autoFocus,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const InputIcon =
    icon === "user"
      ? User
      : icon === "mail"
      ? Mail
      : icon === "lock"
      ? Lock
      : icon === "check"
      ? CircleCheck
      : undefined;

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const inputId = id ?? name ?? `auth-input-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = `${inputId}-error`;

  const leftIconElement = leftIcon ? (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]">
      {leftIcon}
    </div>
  ) : InputIcon ? (
    <InputIcon
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
    />
  ) : null;

  const rightIconElement = rightIcon ? (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]">
      {rightIcon}
    </div>
  ) : type === "password" ? (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  ) : null;

  const paddingLeft = leftIcon || icon ? "pl-11" : "pl-4";
  const paddingRight = rightIcon || type === "password" ? "pr-12" : "pr-4";

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-[#1B2A4A]">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>

      <div className="relative">
        {leftIconElement}

        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder ?? ""}
          name={name}
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          className={`h-[54px] w-full rounded-xl border ${error ? "border-red-500" : "border-[#E5E7EB]"} bg-[#F8FAFC] ${paddingLeft} ${paddingRight} text-base text-[#1B2A4A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#003665] ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        />

        {rightIconElement}
      </div>

      <p
        id={errorId}
        role={error ? "alert" : undefined}
        className={`min-h-[1.25rem] text-sm text-red-500 ${error ? "visible" : "invisible"}`}
      >
        {error || "\u00A0"}
      </p>
    </div>
  );
}
