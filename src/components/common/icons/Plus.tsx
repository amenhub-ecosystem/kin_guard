import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string; };

export function Plus({ size, width, height, color = "#0B3D63", ...props }: Props) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M7.5 1C7.5 0.446875 7.05312 0 6.5 0C5.94688 0 5.5 0.446875 5.5 1V5.5H1C0.446875 5.5 0 5.94688 0 6.5C0 7.05312 0.446875 7.5 1 7.5H5.5V12C5.5 12.5531 5.94688 13 6.5 13C7.05312 13 7.5 12.5531 7.5 12V7.5H12C12.5531 7.5 13 7.05312 13 6.5C13 5.94688 12.5531 5.5 12 5.5H7.5V1Z" fill={color}/>
    </svg>
  );
}

export default Plus;
