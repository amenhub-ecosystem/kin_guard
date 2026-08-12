import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { AuthButton } from "../../auth-core/components/AuthButton";
import { AuthDivider } from "../../auth-core/components/AuthDivider";
import { AuthInput } from "../../auth-core/components/AuthInput";
import Select from "../../auth-core/components/Select";
import { AuthLogo } from "../../auth-core/components/AuthLogo";
import { SocialLoginButton } from "../../auth-core/components/SocialLoginButton";
import { ApiError, inviteFamilyMembers, type Invitee } from "../api/mockInvitationApi";

const roleOptions: { label: string; value: string }[] = [
  { label: "Family member", value: "family-member" },
  { label: "Caregiver", value: "caregiver" },
];

const invitationMethodOptions: { label: string; value: string }[] = [
  { label: "Email", value: "Email" },
  { label: "WhatsApp", value: "WhatsApp" },
];

const initialInvite: Invitee = {
  id: 1,
  fullName: "",
  relationship: "",
  email: "",
  phone: "",
  role: "family-member",
  preferredMethod: "Email",
};

function validateInvitee(invite: Invitee) {
  const errors: Partial<Record<keyof Invitee, string>> = {};

  if (!invite.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!invite.relationship.trim()) {
    errors.relationship = "Relationship is required.";
  }

  if (!invite.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!invite.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!invite.role.trim()) {
    errors.role = "Role is required.";
  }

  if (!invite.preferredMethod.trim()) {
    errors.preferredMethod = "Invitation method is required.";
  }

  return errors;
}

export default function InviteFamilyPage() {
  const navigate = useNavigate();
  const [invite, setInvite] = useState<Invitee>(initialInvite);
  const [errors, setErrors] = useState<Partial<Record<keyof Invitee, string>>>({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof Invitee, value: string) => {
    setInvite((current: Invitee) => ({ ...current, [field]: value } as Invitee));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError("");

    const nextErrors = validateInvitee(invite);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await inviteFamilyMembers([invite]);
      navigate("/family-admin/setup-complete");
    } catch (error) {
      if (error instanceof ApiError) {
        setGeneralError(error.message);
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] px-6 py-12">
      <div className="mx-auto max-w-[736px]">
        <div className="flex items-center justify-center mb-6">
          <AuthLogo className="h-10 w-auto" />
        </div>

        <div className="mx-auto max-w-[520px] rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:p-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#003665]">
              Invite family members
            </p>
            <h1 className="text-[30px] font-extrabold leading-9 text-[#1B2A4A]">
              Add someone to your care circle
            </h1>
            <p className="text-base leading-6 text-[#64748B]">
              Send an invitation so family members or caregivers can join your care network.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <AuthInput
              label="Full name"
              placeholder="Jane Cooper"
              icon="user"
              value={invite.fullName}
              error={errors.fullName}
              onChange={(value) => updateField("fullName", value)}
              required
            />

            <AuthInput
              label="Relationship"
              placeholder="Sibling, Neighbor, Caregiver"
              icon="user"
              value={invite.relationship}
              error={errors.relationship}
              onChange={(value) => updateField("relationship", value)}
              required
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AuthInput
                label="Email address"
                type="email"
                placeholder="name@example.com"
                icon="mail"
                value={invite.email}
                error={errors.email}
                onChange={(value) => updateField("email", value)}
                required
              />

              <AuthInput
                label="Phone number"
                type="text"
                placeholder="+1 555 123 4567"
                value={invite.phone}
                error={errors.phone}
                onChange={(value) => updateField("phone", value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                label="Role"
                value={invite.role}
                options={roleOptions}
                error={errors.role}
                onChange={(value) => updateField("role", value)}
                className="w-full"
                required
              />

              <Select
                label="Invitation method"
                value={invite.preferredMethod}
                options={invitationMethodOptions}
                error={errors.preferredMethod}
                onChange={(value) => updateField("preferredMethod", value)}
                className="w-full"
                required
              />
            </div>

            {generalError ? (
              <p className="text-sm font-medium text-red-500">{generalError}</p>
            ) : null}

            <div className="space-y-4">
              <AuthButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending invitation..." : "Send invitation"}
              </AuthButton>

              <AuthDivider />

              <SocialLoginButton
                provider="google"
                className="h-[58px] w-full rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                onClick={() => {
                  // TODO: Add Google invite flow.
                }}
              >
                Continue with Google
              </SocialLoginButton>
            </div>
          </form>

          <div className="mt-10 text-sm leading-6 text-[#64748B]">
            <p>
              Invitations are sent instantly to the address you specify.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
