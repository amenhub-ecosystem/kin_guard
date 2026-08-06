export function AuthDivider() {
  return (
    <div className="flex items-center">
      <div className="h-px flex-1 bg-[#E5E7EB]" />

      <span className="mx-4 text-xs font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
        OR
      </span>

      <div className="h-px flex-1 bg-[#E5E7EB]" />
    </div>
  );
}