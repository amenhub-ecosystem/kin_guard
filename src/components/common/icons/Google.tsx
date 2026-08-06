import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function Google({ size, width, height, color = "#4285F4", ...props }: Props) {
  return (
        <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"    
      width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}

    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3.01h3.88c2.27-2.09 3.55-5.17 3.55-8.66Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.27v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.62H1.27A12 12 0 0 0 0 12c0 1.94.46 3.78 1.27 5.38l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.58 1.78l3.43-3.43C17.95 1.15 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4.01 3.1c.95-2.84 3.6-4.95 6.72-4.95Z"
      />
    </svg>
  );
}

export default Google;
