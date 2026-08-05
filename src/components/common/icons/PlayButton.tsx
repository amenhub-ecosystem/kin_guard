import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { color?: string };

export function PlayButton({ color = "#0B3D63", ...props }: Props) {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.99609 0.192983C1.59141 -0.0558449 1.08281 -0.0640481 0.669922 0.168374C0.257031 0.400796 0 0.838296 0 1.31408V10.9391C0 11.4149 0.257031 11.8524 0.669922 12.0848C1.08281 12.3172 1.59141 12.3063 1.99609 12.0602L9.87109 7.24767C10.2621 7.00978 10.5 6.58595 10.5 6.12658C10.5 5.6672 10.2621 5.24611 9.87109 5.00548L1.99609 0.192983Z"
        fill={color}
      />
    </svg>
  );
}
