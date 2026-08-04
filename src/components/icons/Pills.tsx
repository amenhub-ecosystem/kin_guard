import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string };

export function Pills({ size, width, height, ...props }: Props) {
  return (
    <svg viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}>
    <path d="M7 4C5.34375 4 4 5.34375 4 7V14H10V7C10 5.34375 8.65625 4 7 4ZM0 7C0 3.13125 3.13125 0 7 0C10.8687 0 14 3.13125 14 7V21C14 24.8687 10.8687 28 7 28C3.13125 28 0 24.8687 0 21V7ZM34.6813 22.9625C34.2375 23.7312 33.2 23.7812 32.5687 23.1562L20.8438 11.4312C20.2188 10.8062 20.2625 9.7625 21.0375 9.31875C22.5 8.48125 24.1938 8 26 8C31.525 8 36 12.475 36 18C36 19.8062 35.5188 21.5 34.6813 22.9625ZM30.9625 26.6812C29.5 27.5187 27.8062 28 26 28C20.475 28 16 23.525 16 18C16 16.1938 16.4813 14.5 17.3188 13.0375C17.7625 12.2688 18.8 12.2188 19.4312 12.8438L31.1562 24.5688C31.7812 25.1938 31.7375 26.2375 30.9625 26.6812Z" fill="#F7F7F7"/>
    </svg>
  );
}

export default Pills;
