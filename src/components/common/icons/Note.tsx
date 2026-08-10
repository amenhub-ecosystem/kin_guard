import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function Note({ size, width, height, color = "#003665", ...props }: Props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M2.25 1.6875C1.94062 1.6875 1.6875 1.94062 1.6875 2.25V13.5C1.6875 13.8094 1.94062 14.0625 2.25 14.0625H10.125V11.25C10.125 10.6277 10.6277 10.125 11.25 10.125H14.0625V2.25C14.0625 1.94062 13.8094 1.6875 13.5 1.6875H2.25ZM10.125 15.75H2.25C1.00898 15.75 0 14.741 0 13.5V2.25C0 1.00898 1.00898 0 2.25 0H13.5C14.741 0 15.75 1.00898 15.75 2.25V10.125V10.3184C15.75 10.916 15.5145 11.4891 15.0926 11.9109L11.9109 15.0926C11.4891 15.5145 10.916 15.75 10.3184 15.75H10.125Z" fill={color}/>
    </svg>
  );
}

export default Note;
