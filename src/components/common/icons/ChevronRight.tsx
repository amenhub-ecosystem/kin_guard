import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function ChevronRight({ size, width, height, color = "white", ...props }: Props) {
  return (
    <svg viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M5.78145 4.72207C6.07441 5.01504 6.07441 5.49082 5.78145 5.78379L1.28145 10.2838C0.988476 10.5768 0.512695 10.5768 0.219727 10.2838C-0.0732422 9.99082 -0.0732422 9.51504 0.219727 9.22207L4.19004 5.25176L0.22207 1.28145C-0.0708985 0.988477 -0.0708985 0.512695 0.22207 0.219727C0.515039 -0.0732422 0.99082 -0.0732422 1.28379 0.219727L5.78379 4.71973L5.78145 4.72207Z" fill={color} fillOpacity="0.4"/>
    </svg>
  );
}

export default ChevronRight;
