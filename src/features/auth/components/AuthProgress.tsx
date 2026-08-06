export type AuthProgressProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export function AuthProgress({
  currentStep,
  totalSteps,
  className = "",
}: AuthProgressProps) {
  return (
    <div className={`flex items-center ${className}`.trim()}>
      <span className="text-sm font-semibold tracking-[-0.004em] text-[#64748B]">
        Step {currentStep} of {totalSteps}
      </span>

      <div className="ml-3 flex gap-1">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index + 1 === currentStep;

          return (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-colors ${
                isActive ? "w-8 bg-[#003665]" : "w-4 bg-[#E5E7EB]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AuthProgress;
