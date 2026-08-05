import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string; };

export function Minus({ size, width, height, color = "#0B3D63", ...props }: Props) {
    return (
        <svg
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size ?? width ?? 24}
            height={size ?? height ?? 24}
            {...props}
        >
            <path
                d="M1 5.5C0.446875 5.5 0 5.94688 0 6.5C0 7.05312 0.446875 7.5 1 7.5H12C12.5531 7.5 13 7.05312 13 6.5C13 5.94688 12.5531 5.5 12 5.5H1Z"
                fill={color}
            />
        </svg>
    );
}

export default Minus;
