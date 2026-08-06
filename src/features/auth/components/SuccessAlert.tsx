import { CheckCircle2 } from "@/components/common/icons";

interface SuccessAlertProps {
  title: string;
  description: string;
}

export function SuccessAlert({
  title,
  description,
}: SuccessAlertProps) {
  return (
    <div className="flex gap-4 rounded-3xl border border-green-200 bg-[#F0FDF4] p-6">
      <CheckCircle2
        className="mt-1 h-6 w-6 shrink-0 text-[#22C55E]"
        strokeWidth={2.5}
      />

      <div>
        <h3 className="text-xl font-bold text-[#166534]">
          {title}
        </h3>

        <p className="mt-1 text-base leading-8 text-[#15803D]">
          {description}
        </p>
      </div>
    </div>
  );
}