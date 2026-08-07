import { ChevronDownIcon } from "@/components/common/icons";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

const PANEL_GAP = 8; // space between trigger and panel
const VIEWPORT_MARGIN = 8; // min space to keep between panel and viewport edge
const MIN_PANEL_HEIGHT = 120; // don't shrink the panel below this if avoidable

interface PanelPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  openUpward: boolean;
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [typeahead, setTypeahead] = useState("");
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const typeaheadTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generatedId = useRef(
    `select-${Math.random().toString(36).slice(2, 9)}`
  ).current;
  const controlId = id ?? generatedId;
  const listboxId = `${controlId}-listbox`;

  const selectedOption = options.find((option) => option.value === value);
  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value]
  );

  // --- Portal target must wait for client mount (SSR safety) ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Viewport-aware positioning: flip up/down, clamp left/right, cap height ---
  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom - PANEL_GAP - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - PANEL_GAP - VIEWPORT_MARGIN;

    // Prefer opening downward; flip upward only if there's not enough room
    // below AND opening upward genuinely gives more room.
    const openUpward = spaceBelow < MIN_PANEL_HEIGHT && spaceAbove > spaceBelow;

    const availableHeight = Math.max(
      openUpward ? spaceAbove : spaceBelow,
      MIN_PANEL_HEIGHT
    );
    // Never exceed the actual space in that direction, even past the minimum,
    // to avoid the panel escaping the viewport on very short screens.
    const maxHeight = Math.min(
      availableHeight,
      openUpward ? spaceAbove : spaceBelow,
      320 // sensible cap so it never looks absurd on huge screens
    );

    // Clamp horizontal position so the panel never renders off-screen
    let left = rect.left + window.scrollX;
    const width = rect.width;
    const rightEdge = rect.left + width;
    if (rightEdge > viewportWidth - VIEWPORT_MARGIN) {
      left = window.scrollX + Math.max(VIEWPORT_MARGIN, viewportWidth - width - VIEWPORT_MARGIN);
    }
    if (left < window.scrollX + VIEWPORT_MARGIN) {
      left = window.scrollX + VIEWPORT_MARGIN;
    }

    const top = openUpward
      ? rect.top + window.scrollY - PANEL_GAP // panel's bottom edge anchors here (handled via transform below)
      : rect.bottom + window.scrollY + PANEL_GAP;

    setPosition({
      top,
      left,
      width,
      maxHeight: Math.max(maxHeight, MIN_PANEL_HEIGHT > availableHeight ? availableHeight : maxHeight),
      openUpward,
    });
  };

  useLayoutEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleReposition = () => updatePosition();
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = containerRef.current?.contains(target);
      const clickedPanel = listRef.current?.contains(target);
      if (!clickedTrigger && !clickedPanel) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    } else {
      setActiveIndex(-1);
      setPosition(null);
    }
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (disabled || options.length === 0) {
      setIsOpen(false);
    }
  }, [disabled, options.length]);

  useEffect(() => {
    return () => {
      if (typeaheadTimeout.current) clearTimeout(typeaheadTimeout.current);
    };
  }, []);

  const commitSelection = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleTypeahead = (char: string) => {
    if (typeaheadTimeout.current) clearTimeout(typeaheadTimeout.current);
    const next = typeahead + char.toLowerCase();
    setTypeahead(next);
    typeaheadTimeout.current = setTimeout(() => setTypeahead(""), 500);

    const match = options.findIndex((option) =>
      option.label.toLowerCase().startsWith(next)
    );
    if (match >= 0) setActiveIndex(match);
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setActiveIndex((prev) => {
            const dir = event.key === "ArrowDown" ? 1 : -1;
            const len = options.length;
            if (len === 0) return -1;
            return (prev + dir + len) % len;
          });
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (activeIndex >= 0) {
          commitSelection(activeIndex);
        }
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
      case "Home":
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      default:
        if (isOpen && event.key.length === 1 && /\S/.test(event.key)) {
          handleTypeahead(event.key);
        }
        break;
    }
  };

  const activeOptionId =
    isOpen && activeIndex >= 0 && options[activeIndex]
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  const panel =
    isOpen && !disabled && options.length > 0 && mounted && position
      ? createPortal(
          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? controlId : undefined}
            tabIndex={-1}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width,
              maxHeight: position.maxHeight,
              zIndex: 2147483647,
              transform: position.openUpward ? "translateY(-100%)" : undefined,
            }}
            className="overflow-y-auto rounded-xl border border-[#E5E7EB] bg-white shadow-lg"
          >
            {options.map((option, index) => {
              const isSelected = value === option.value;
              const isActive = index === activeIndex;
              return (
                <button
                  key={option.value}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commitSelection(index)}
                  className={clsx(
                    "flex w-full items-center px-4 py-3 text-left text-sm text-[#1B2A4A] transition hover:bg-[#F8FAFC]",
                    isSelected && "bg-[#F8FAFC] font-semibold text-[#003665]",
                    isActive && "bg-[#EFF3FA]"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <div ref={containerRef} className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={controlId} className="text-sm font-bold text-[#1B2A4A]">
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <button
          ref={buttonRef}
          id={controlId}
          type="button"
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          aria-required={required || undefined}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${controlId}-error` : undefined}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleButtonKeyDown}
          className={clsx(
            "flex h-[58px] w-full items-center justify-between rounded-xl border bg-white px-4 pr-10 text-left text-base shadow-sm outline-none transition-all",
            "focus:border-[#003665] focus:ring-2 focus:ring-[#003665]/10",
            disabled && "cursor-not-allowed bg-gray-50 text-gray-400",
            error ? "border-red-500" : "border-[#E5E7EB]"
          )}
        >
          <span className={clsx("truncate", !selectedOption && "text-[#9CA3AF]")}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDownIcon
            className={clsx(
              "pointer-events-none absolute right-3 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 text-[#D1D5DB] transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Real form field so name/required/value work in native <form> submits */}
        <input
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          name={name}
          value={value}
          required={required}
          readOnly
          onFocus={() => buttonRef.current?.focus()}
        />
      </div>

      {panel}

      {error && (
        <span id={`${controlId}-error`} role="alert" className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}