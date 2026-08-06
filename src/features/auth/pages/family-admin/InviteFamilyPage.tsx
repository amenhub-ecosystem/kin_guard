import { useState, type InputHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

import { AuthButton } from "../../components/AuthButton";
import { AuthProgress } from "../../components/AuthProgress";
import Select, { type SelectOption } from "../../components/Select";
import { LogoWithText } from "@/components/common/LogoWithText";

import {
  PlusWithDottedCircle,
  Trash2,
  Shield,
  ChevronDownIcon,
  ChevronLeft,
} from "@/components/common/icons";

interface FamilyMember {
  id: number;
  avatar?: string;
  fullName: string;
  relationship: string;
  email: string;
  phone: string;
  role: string;
  preferredMethod: string;
}

const relationshipOptions: SelectOption[] = [
  { label: "Parent", value: "Parent" },
  { label: "Child", value: "Child" },
  { label: "Sibling", value: "Sibling" },
  { label: "Spouse", value: "Spouse" },
  { label: "Friend", value: "Friend" },
  { label: "Neighbor", value: "Neighbor" },
  { label: "Caregiver", value: "Caregiver" },
  { label: "Other", value: "Other" },
];

const roleOptions: SelectOption[] = [
  { label: "Primary Caregiver", value: "Primary Caregiver" },
  { label: "Family Member", value: "Family Member" },
  { label: "Healthcare Professional", value: "Healthcare Professional" },
  { label: "Emergency Contact", value: "Emergency Contact" },
];

const methodOptions: SelectOption[] = [
  { label: "SMS", value: "SMS" },
  { label: "Email", value: "Email" },
  { label: "Phone Call", value: "Phone Call" },
  { label: "Push Notification", value: "Push Notification" },
];

function FormInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`h-[58px] w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 text-base text-[#1B2A4A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#003665] focus:ring-2 focus:ring-[#003665]/10 ${props.className ?? ""
        }`.trim()}
    />
  );
}

interface MemberCardProps {
  member: FamilyMember;
  onChange: (
    id: number,
    field: keyof FamilyMember,
    value: string
  ) => void;
  onRemove: (id: number) => void;
}

function MemberCard({
  member,
  onChange,
  onRemove,
}: MemberCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#F3F4F6] px-7 py-6">

        <div className="flex items-center gap-4">

          <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">

            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-500">
                {member.fullName
                  ? member.fullName.charAt(0)
                  : "?"}
              </div>
            )}

          </div>

        </div>

        <button
          type="button"
          onClick={() => onRemove(member.id)}
          className="text-gray-400 transition hover:text-red-500"
        >
          <Trash2 size={20} />
        </button>

      </div>

      {/* Body */}

      <div className="space-y-4 bg-[#FCFCFD] p-7">

        <div className="grid grid-cols-2 gap-4">

          <FormInput
            placeholder="Full Name"
            value={member.fullName}
            onChange={(e) =>
              onChange(
                member.id,
                "fullName",
                e.target.value
              )
            }
          />

          <div className="relative">

            <Select
              value={member.relationship}
              options={relationshipOptions}
              placeholder="Relationship"
              onChange={(value) =>
                onChange(
                  member.id,
                  "relationship",
                  value
                )
              }
            />

            <ChevronDownIcon
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

          </div>

        </div>

        <FormInput
          type="email"
          placeholder="email@address.com"
          value={member.email}
          onChange={(e) =>
            onChange(
              member.id,
              "email",
              e.target.value
            )
          }
        />

        <FormInput
          placeholder="+2348000000000"
          value={member.phone}
          onChange={(e) =>
            onChange(
              member.id,
              "phone",
              e.target.value
            )
          }
        />

        <div className="relative">

          <Select
            value={member.role}
            options={roleOptions}
            placeholder="Role"
            onChange={(value) =>
              onChange(member.id, "role", value)
            }
          />

          <ChevronDownIcon
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

        </div>

        <div className="relative">

          <Select
            value={member.preferredMethod}
            options={methodOptions}
            placeholder="Preferred Method"
            onChange={(value) =>
              onChange(
                member.id,
                "preferredMethod",
                value
              )
            }
          />

          <ChevronDownIcon
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

        </div>

      </div>

    </div>
  );
}

export default function InviteFamilyPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      fullName: "",
      relationship: "",
      email: "",
      phone: "",
      role: "",
      preferredMethod: "",
      avatar: "/images/avatar-placeholder.png",
    },
  ]);

  const updateMember = (
    id: number,
    field: keyof FamilyMember,
    value: string
  ) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
            ...member,
            [field]: value,
          }
          : member
      )
    );
  };

  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        fullName: "",
        relationship: "",
        email: "",
        phone: "",
        role: "",
        preferredMethod: "",
      },
    ]);
  };

  const removeMember = (id: number) => {
    setMembers((prev) =>
      prev.filter((member) => member.id !== id)
    );
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#FDFDFD] px-6 py-12">

      <div className="w-full max-w-[640px]">

        {/* Header */}

        <div className="mb-12 flex items-center justify-between">

          <LogoWithText />

          <AuthProgress
            currentStep={3}
            totalSteps={4}
          />

        </div>

        {/* Title */}

        <div className="mb-8">

          <h1 className="font-space text-[30px] font-bold text-[#1B2A4A]">
            Invite Your Care Team
          </h1>

          <p className="mt-2 text-base text-[#64748B]">
            Add family members, trusted friends or healthcare
            professionals to help care for your loved one.
          </p>

        </div>

        {/* Members */}

        <div className="space-y-6">

          {members.map((member, index) => (
            <div key={member.id}>

              <div className="mb-3 flex items-center justify-between">

                <h3 className="text-lg font-bold text-[#1B2A4A]">
                  Team Member {index + 1}
                </h3>

                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="text-sm font-medium text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}

              </div>

              <MemberCard
                member={member}
                onChange={updateMember}
                onRemove={removeMember}
              />

            </div>
          ))}

          {/* Add Member */}

          <button
            type="button"
            onClick={addMember}
            className="flex h-[64px] w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#D7DFE9] bg-[#F8FAFC] text-[#003665] transition hover:border-[#003665] hover:bg-[#F4F8FC]"
          >

            <PlusWithDottedCircle size={32} />

            <span className="font-semibold">
              Add Another Team Member
            </span>

          </button>

          {/* Tip */}

          <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">

            <div className="flex gap-3">

              <Shield
                size={18}
                className="mt-1 shrink-0 text-[#003665]"
              />

              <div>

                <h4 className="font-semibold text-[#1B2A4A]">
                  Privacy First
                </h4>

                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  Every invited member will receive their own
                  secure account and only the permissions you
                  choose to grant them.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="mt-10">

          <AuthButton
            className="h-[64px] w-full rounded-2xl bg-[#003665] text-lg font-semibold shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            onClick={() => navigate("/family-admin/setup-complete")}
          >
            Send Invitations
          </AuthButton>

         {/* Navigation */}

<div className="mt-10 flex items-center justify-center text-[18px] font-semibold text-[#64748B]">

  <button
    type="button"
    onClick={() => navigate("/family-admin/create-care-circle")}
    className="flex items-center gap-2 transition hover:text-[#003665]"
  >
    <ChevronLeft size={18} />
    <span>Back</span>
  </button>

  <div className="mx-8 h-6 w-px bg-[#E5E7EB]" />

  <button
    type="button"
    onClick={() => navigate("/family-admin/setup-complete")}
    className="transition hover:text-[#003665]"
  >
    Skip for Now
  </button>

</div>

        </div>

        {/* Footer */}

        <div className="mt-12 flex items-center justify-center gap-6 border-t border-[#F3F4F6] pt-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">


          <div className="h-3 w-px bg-[#CBD5E1]" />

          <span>End-to-End Encrypted</span>

          <div className="h-3 w-px bg-[#CBD5E1]" />

          <span>GDPR Compliant</span>

        </div>

      </div>

    </div>
  );
}