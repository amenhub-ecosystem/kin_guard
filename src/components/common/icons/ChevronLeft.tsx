import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function ChevronLeft({ size, width, height, color = "#64748B", ...props }: Props) {
  return (
    <svg viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M0.183105 3.93506C-0.0610352 4.1792 -0.0610352 4.57568 0.183105 4.81982L3.93311 8.56982C4.17725 8.81396 4.57373 8.81396 4.81787 8.56982C5.06201 8.32568 5.06201 7.9292 4.81787 7.68506L1.50928 4.37646L4.81592 1.06787C5.06006 0.82373 5.06006 0.427246 4.81592 0.183105C4.57178 -0.0610351 4.17529 -0.0610351 3.93115 0.183105L0.181152 3.9331L0.183105 3.93506Z" fill={color}/>
    </svg>
  );
}

export default ChevronLeft;
