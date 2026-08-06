import { FamilyAdminAuthLayout } from "@/features/auth/layouts/FamilyAdminAuthLayout";

export function InviteFamilyPage() {
  return (
    <FamilyAdminAuthLayout
      step={3}
      title="Invite family members"
      description="Everyone stays informed together. Share alerts and daily updates with those who matter most."
    >
      <div>Invite family members form placeholder</div>
    </FamilyAdminAuthLayout>
  );
}