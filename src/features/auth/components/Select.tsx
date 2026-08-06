import { ChevronDownIcon } from "@/components/common/icons";
import clsx from "clsx";
import type { ChangeEvent } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  options: SelectOption[];
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  placeholder = "Select...",
  value,
  options,
  name,
  id,
  required,
  disabled,
  error,
  className,
  onChange,
}: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-bold text-[#1B2A4A]"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={clsx(
            "h-[58px] w-full appearance-none rounded-xl border bg-white px-4 pr-12",
            "text-base text-[#1B2A4A]",
            "shadow-sm outline-none transition-all",
            "focus:border-[#003665] focus:ring-2 focus:ring-[#003665]/10",
            disabled && "cursor-not-allowed bg-gray-50 text-gray-400",
            error
              ? "border-red-500"
              : "border-[#E5E7EB]"
          )}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDownIcon
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D1D5DB]"
        />
      </div>

      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}