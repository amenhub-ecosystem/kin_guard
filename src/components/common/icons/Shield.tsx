import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function Shield({ size, width, height, color = "#1B2A4A", ...props }: Props) {
  return (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M4.68751 0C4.77735 0 4.8672 0.0195313 4.94923 0.0566406L8.62696 1.61719C9.05665 1.79883 9.37696 2.22266 9.37501 2.73438C9.36524 4.67188 8.56837 8.2168 5.20313 9.82812C4.87696 9.98438 4.49806 9.98438 4.17188 9.82812C0.80665 8.2168 0.00977451 4.67188 8.88377e-06 2.73438C-0.00194424 2.22266 0.318368 1.79883 0.748056 1.61719L4.42774 0.0566406C4.50782 0.0195313 4.59767 0 4.68751 0ZM4.68751 1.30469V8.6875C7.38282 7.38281 8.10743 4.49414 8.12501 2.76172L4.68751 1.30469Z" fill={color}/>
    </svg>
  );
}

export default Shield;
