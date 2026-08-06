import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function ArrowLeft({ size, width, height, color = "#9CA3AF", ...props }: Props) {
  return (
    <svg viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M0.219727 3.97207C-0.0732422 4.26504 -0.0732422 4.74082 0.219727 5.03379L3.96973 8.78379C4.2627 9.07676 4.73848 9.07676 5.03145 8.78379C5.32441 8.49082 5.32441 8.01504 5.03145 7.72207L2.55879 5.25176H9.74941C10.1643 5.25176 10.4994 4.9166 10.4994 4.50176C10.4994 4.08691 10.1643 3.75176 9.74941 3.75176H2.56113L5.0291 1.28145C5.32207 0.988476 5.32207 0.512695 5.0291 0.219727C4.73613 -0.0732422 4.26035 -0.0732422 3.96738 0.219727L0.217383 3.96973L0.219727 3.97207Z" fill={color}/>
    </svg>
  );
}

export default ArrowLeft;
