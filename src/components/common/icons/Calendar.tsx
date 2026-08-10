import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function Calendar({ size, width, height, color = "#6B7280", ...props }: Props) {
  return (
    <svg viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M4.15625 0.65625C4.15625 0.292578 3.86367 0 3.5 0C3.13633 0 2.84375 0.292578 2.84375 0.65625V1.75H1.75C0.784766 1.75 0 2.53477 0 3.5V3.9375V5.25V12.25C0 13.2152 0.784766 14 1.75 14H10.5C11.4652 14 12.25 13.2152 12.25 12.25V5.25V3.9375V3.5C12.25 2.53477 11.4652 1.75 10.5 1.75H9.40625V0.65625C9.40625 0.292578 9.11367 0 8.75 0C8.38633 0 8.09375 0.292578 8.09375 0.65625V1.75H4.15625V0.65625ZM1.3125 5.25H10.9375V12.25C10.9375 12.4906 10.7406 12.6875 10.5 12.6875H1.75C1.50937 12.6875 1.3125 12.4906 1.3125 12.25V5.25Z" fill={color}/>
    </svg>
  );
}

export default Calendar;
