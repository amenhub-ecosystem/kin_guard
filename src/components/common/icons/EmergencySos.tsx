import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string };

export function EmergencySos({ size, width, height, ...props }: Props) {
  return (
    <svg viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M2.5 0C1.12109 0 0 1.12109 0 2.5V15C0 16.3789 1.12109 17.5 2.5 17.5H3.75V0H2.5ZM5 0V17.5H17.5V0H5ZM20 17.5C21.3789 17.5 22.5 16.3789 22.5 15V2.5C22.5 1.12109 21.3789 0 20 0H18.75V17.5H20ZM10 5.625C10 5.28125 10.2812 5 10.625 5H11.875C12.2188 5 12.5 5.28125 12.5 5.625V7.5H14.375C14.7188 7.5 15 7.78125 15 8.125V9.375C15 9.71875 14.7188 10 14.375 10H12.5V11.875C12.5 12.2188 12.2188 12.5 11.875 12.5H10.625C10.2812 12.5 10 12.2188 10 11.875V10H8.125C7.78125 10 7.5 9.71875 7.5 9.375V8.125C7.5 7.78125 7.78125 7.5 8.125 7.5H10V5.625Z" fill="white"/>
    </svg>
  );
}

export default EmergencySos;
