import logo from "../assets/logo.svg";

interface AuthLogoProps {
  className?: string;
}

export function AuthLogo({ className = "" }: AuthLogoProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src={logo}
        alt="KinGuard"
        className="h-10 w-auto"
        draggable={false}
      />
    </div>
  );
}