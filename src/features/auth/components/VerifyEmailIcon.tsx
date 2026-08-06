import verifyEmailIcon from "../assets/images/VerifyEmailIcon.svg";

export function VerifyEmailIcon() {
  return (
    <div className="relative flex justify-start">
      <img
        src={verifyEmailIcon}
        alt="Verify your email"
        className="h-20 w-20"
        draggable={false}
      />
    </div>
  );
}