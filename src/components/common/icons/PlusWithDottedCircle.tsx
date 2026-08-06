import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

export function PlusWithDottedCircle({ size, width, height, color = "#FE706D", ...props }: Props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <rect x="1" y="1" width="30" height="30" rx="15" stroke="#FE706D" stroke-width="2" stroke-dasharray="6 4"/>
    <path d="M16.75 11.875C16.75 11.4602 16.4148 11.125 16 11.125C15.5852 11.125 15.25 11.4602 15.25 11.875V15.25H11.875C11.4602 15.25 11.125 15.5852 11.125 16C11.125 16.4148 11.4602 16.75 11.875 16.75H15.25V20.125C15.25 20.5398 15.5852 20.875 16 20.875C16.4148 20.875 16.75 20.5398 16.75 20.125V16.75H20.125C20.5398 16.75 20.875 16.4148 20.875 16C20.875 15.5852 20.5398 15.25 20.125 15.25H16.75V11.875Z" fill={color}/>
    </svg>
  );
}

export default PlusWithDottedCircle;
