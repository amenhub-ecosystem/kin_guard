import { useRef, useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Users,
  Shield,
} from "@/components/common/icons";

import { AuthButton } from "../../components/AuthButton";
import Select, { type SelectOption } from "../../components/Select.tsx";
import { LogoWithText } from "@/components/common/LogoWithText.tsx";
import { AuthProgress } from "../../components/AuthProgress.tsx";
import { getCareCircleDraft, saveCareCircleDraft, type CareCircleDraft } from "../../utils/authFlow";

interface CareCircleForm {
  circleName: string;
  lovedOneName: string;
  relationship: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  medication: string;
  dailyCheckIns: string;
}

interface CareCircleFormErrors {
  circleName?: string;
  lovedOneName?: string;
  relationship?: string;
  age?: string;
  gender?: string;
  phone?: string;
  email?: string;
  medication?: string;
  dailyCheckIns?: string;
}

const relationshipOptions: SelectOption[] = [
  { label: "Parent", value: "Parent" },
  { label: "Grandparent", value: "Grandparent" },
  { label: "Sibling", value: "Sibling" },
  { label: "Spouse", value: "Spouse" },
  { label: "Friend", value: "Friend" },
  { label: "Neighbor", value: "Neighbor" },
  { label: "Other", value: "Other" },
];

const genderOptions: SelectOption[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const medicationOptions: SelectOption[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const dailyCheckInOptions: SelectOption[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

function FormInput(props: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const { error, ...inputProps } = props;

  return (
    <div className="space-y-2">
      <input
        {...inputProps}
        className={`h-[58px] w-full rounded-xl border ${error ? "border-red-500" : "border-[#E5E7EB]"} bg-[#F8FAFC] px-4 text-base text-[#1B2A4A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#003665] focus:ring-2 focus:ring-[#003665]/10 ${props.className ?? ""}`.trim()}
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default function CreateCareCirclePage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | undefined>(() => {
    const savedDraft = getCareCircleDraft();
    return savedDraft?.photo ?? undefined;
  });

  const [form, setForm] = useState<CareCircleForm>(() => {
    const savedDraft = getCareCircleDraft();
    if (!savedDraft) {
      return {
        circleName: "",
        lovedOneName: "",
        relationship: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        medication: "",
        dailyCheckIns: "",
      };
    }

    return {
      circleName: savedDraft.circleName ?? "",
      lovedOneName: savedDraft.lovedOneName ?? "",
      relationship: savedDraft.relationship ?? "",
      age: savedDraft.age ?? "",
      gender: savedDraft.gender ?? "",
      phone: savedDraft.phone ?? "",
      email: savedDraft.email ?? "",
      medication: savedDraft.medication ?? "",
      dailyCheckIns: savedDraft.dailyCheckIns ?? "",
    };
  });
  const [errors, setErrors] = useState<CareCircleFormErrors>({});

  const updateField = (
    field: keyof CareCircleForm,
    value: string
  ) => {
    setForm((prevForm) => {
      const nextForm = {
        ...prevForm,
        [field]: value,
      };
      saveCareCircleDraft(nextForm as CareCircleDraft);
      return nextForm;
    });
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors: CareCircleFormErrors = {};
    const requiredFields: Array<keyof CareCircleForm> = [
      "circleName",
      "lovedOneName",
      "relationship",
      "age",
      "gender",
      "phone",
      "email",
      "medication",
      "dailyCheckIns",
    ];

    requiredFields.forEach((field) => {
      const value = form[field].trim();
      if (!value) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.phone && !/^\+?[0-9\s()-]{7,15}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      saveCareCircleDraft(form as CareCircleDraft);
      navigate("/family-admin/invite-family");
    }
  };

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPhoto(preview);
    setForm((prevForm) => {
      const nextForm = { ...prevForm, photo: preview } as CareCircleForm & { photo?: string };
      saveCareCircleDraft(nextForm as CareCircleDraft);
      return nextForm;
    });
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#FDFDFD] px-6 py-12">

      <div className="w-full max-w-[512px]">

        {/* HEADER */}

        <div className="mb-12 flex items-center justify-between">

          <LogoWithText />

          <div className="flex items-center gap-3">
            <AuthProgress currentStep={2} totalSteps={4} />
          </div>

        </div>

        {/* TITLE */}

        <div className="mb-8">

          <h1 className="font-space text-[30px] font-bold text-[#1B2A4A]">
            Create your first Care Circle
          </h1>

          <p className="mt-2 text-base text-slate-500">
            Identify the person you'll be looking after and
            name your team.
          </p>

        </div>

        {/* PHOTO */}

        <div
          onClick={() => inputRef.current?.click()}
          className="mb-6 flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-8 transition hover:border-[#003665]"
        >

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleUpload}
          />

          {photo ? (
            <img
              src={photo}
              alt="Preview"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-white shadow-sm">

              <Camera
                size={24}
                className="text-gray-400"
              />

            </div>
          )}

          <h3 className="mt-4 text-sm font-semibold text-[#003665]">
            Upload Photo
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Optional: A photo of your loved one
          </p>

        </div>

        {/* FORM */}

        <div className="space-y-6">

          {/* Circle Name */}

          <div>

            <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
              Circle Name
            </label>

            <div className="relative">

              <FormInput
                value={form.circleName}
                placeholder="e.g. Grandma's Team, Johnson Family"
                error={errors.circleName}
                onChange={(e) => updateField("circleName", e.target.value)}
              />

              <Users
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              />

            </div>

          </div>

          {/* Name + Relationship */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Loved One's Name
              </label>

              <FormInput
                value={form.lovedOneName}
                placeholder="Full Name"
                error={errors.lovedOneName}
                onChange={(e) => updateField("lovedOneName", e.target.value)}
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Relationship
              </label>

              <div className="relative">

                <Select
                  value={form.relationship}
                  options={relationshipOptions}
                  placeholder="Select..."
                  error={errors.relationship}
                  onChange={(value) =>
                    updateField("relationship", value)
                  }
                />

              </div>

            </div>

          </div>
          {/* Age + Gender */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Loved One's Age
              </label>

              <FormInput
                type="number"
                placeholder="Age"
                value={form.age}
                error={errors.age}
                onChange={(e) => updateField("age", e.target.value)}
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Loved One's Gender
              </label>

              <div className="relative">

                <Select
                  value={form.gender}
                  options={genderOptions}
                  placeholder="Select..."
                  error={errors.gender}
                  onChange={(value) =>
                    updateField("gender", value)
                  }
                />

              </div>

            </div>

          </div>

          {/* Phone + Email */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Phone Number
              </label>

              <FormInput
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                error={errors.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Email
              </label>

              <FormInput
                type="email"
                placeholder="Email"
                value={form.email}
                error={errors.email}
                onChange={(e) => updateField("email", e.target.value)}
              />

            </div>

          </div>

          {/* Medication + Daily Check-ins */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Medication
              </label>

              <div className="relative">

                <Select
                  value={form.medication}
                  options={medicationOptions}
                  placeholder="Select..."
                  error={errors.medication}
                  onChange={(value) =>
                    updateField("medication", value)
                  }
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-bold text-[#1B2A4A]">
                Needs Daily Check-ins
              </label>

              <div className="relative">

                <Select
                  value={form.dailyCheckIns}
                  options={dailyCheckInOptions}
                  placeholder="Select..."
                  error={errors.dailyCheckIns}
                  onChange={(value) =>
                    updateField("dailyCheckIns", value)
                  }
                />

              </div>

            </div>

          </div>

          {/* Pro Tip */}

          <div className="flex items-start rounded-2xl border border-sky-100 bg-sky-50/40 p-4">

            <div className="mt-1 shrink-0">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#003665]"
              >
                <path d="M9 21h6v-1H9v1Zm3-20C7.59 1 4 4.59 4 9c0 2.38 1.19 4.47 3 5.74V18a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3.26A6.99 6.99 0 0 0 20 9c0-4.41-3.59-8-8-8Z" />
              </svg>

            </div>

            <p className="ml-3 text-xs leading-5 text-[#1B2A4A]">
              <span className="font-bold">Pro-tip:</span> You can invite family
              members, neighbors, or professional caregivers to this circle in
              the next step.
            </p>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-8">

          <AuthButton
            className="h-[68px] w-full rounded-2xl bg-[#003665] text-lg font-bold shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            onClick={handleContinue}
          >
            Continue →
          </AuthButton>

          {/* Join Existing */}
          <div className="mt-10 text-center text-sm">

            <button
              type="button"
              onClick={() => navigate("/family-admin/care-circle-setup")}
              className="ml-1 font-medium text-[#64748B] hover:underline"
            >
              Back
            </button>
          </div>


        </div>

        {/* FOOTER */}

        <div className="mt-12 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.05em] text-[#1B2A4A] opacity-50">

          <div className="flex items-center gap-1">

            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8V6a5 5 0 1 0-10 0v2H5v13h14V8h-2Zm-8-2a3 3 0 1 1 6 0v2H9V6Z" />
            </svg>

            <span>End-to-End Encrypted</span>

          </div>

          <div className="h-3 w-px bg-gray-300" />

          <div className="flex items-center gap-1">

            <Shield
              size={10}
              className="text-gray-400"
            />

            <span>GDPR Compliant</span>

          </div>

        </div>

      </div>

    </div>
  );
}