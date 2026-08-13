import { type Role, ROLES } from "./roles";
import type { Permission } from "./permissions";

export type SidebarItem = {
  label: string;
  path: string;
  icon: string;
  permission: Permission;
  section?: "main" | "bottom";
};

export const sidebarNavigation: Record<Role, SidebarItem[]> = {
  [ROLES.FAMILY_ADMIN]: [
    { label: "Dashboard", path: "/dashboard", icon: "House", permission: "viewDashboard", section: "main" },
    { label: "Care Circle", path: "/dashboard/care-circle", icon: "Users", permission: "viewCareCircle", section: "main" },
    { label: "Medication", path: "/dashboard/medication", icon: "Pills", permission: "editMedication", section: "main" },
    { label: "Check-ins", path: "/dashboard/check-ins", icon: "CheckCircle", permission: "sendCheckIn", section: "main" },
    { label: "Insights", path: "/dashboard/insights", icon: "Chart", permission: "viewInsights", section: "main" },
    { label: "Messages", path: "/dashboard/messages", icon: "Chat", permission: "viewMessages", section: "main" },
    { label: "Emergency Center", path: "/dashboard/emergency-sos", icon: "Alert", permission: "manageEmergencyCenter", section: "bottom" },
    { label: "Settings", path: "/dashboard/settings", icon: "Gear", permission: "viewSettings", section: "bottom" },
  ],
  [ROLES.FAMILY_MEMBER]: [
    { label: "Home", path: "/dashboard", icon: "House", permission: "viewDashboard", section: "main" },
    { label: "Care Circle", path: "/dashboard/care-circle", icon: "Users", permission: "viewCareCircle", section: "main" },
    { label: "Loved One", path: "/dashboard/loved-one", icon: "HeartThrob", permission: "viewLovedOneProfile", section: "main" },
    { label: "Messages", path: "/dashboard/messages", icon: "Chat", permission: "viewMessages", section: "main" },
    { label: "Alerts", path: "/dashboard/notifications", icon: "Alert", permission: "viewAlerts", section: "main" },
    { label: "Profile", path: "/dashboard/profile", icon: "User", permission: "viewProfile", section: "main" },
    { label: "Emergency Center", path: "/dashboard/emergency-sos", icon: "Alert", permission: "manageEmergencyCenter", section: "bottom" },
    { label: "Settings", path: "/dashboard/settings", icon: "Gear", permission: "viewSettings", section: "bottom" },

  ],
  [ROLES.CAREGIVER]: [
    { label: "Today", path: "/dashboard", icon: "House", permission: "viewDashboard", section: "main" },
    { label: "Loved One", path: "/dashboard/loved-one", icon: "HeartThrob", permission: "viewLovedOneProfile", section: "main" },
    { label: "Medication", path: "/dashboard/medication", icon: "Pills", permission: "viewMedication", section: "main" },
    { label: "Activity", path: "/dashboard/activity", icon: "Chart", permission: "viewActivityTimeline", section: "main" },
    { label: "Alerts", path: "/dashboard/notifications", icon: "Alert", permission: "viewAlerts", section: "main" },
    { label: "Profile", path: "/dashboard/profile", icon: "User", permission: "viewProfile", section: "main" },
    { label: "Emergency Center", path: "/dashboard/emergency-sos", icon: "Alert", permission: "manageEmergencyCenter", section: "bottom" },
    { label: "Settings", path: "/dashboard/settings", icon: "Gear", permission: "viewSettings", section: "bottom" },
  ],
};

export const getSidebarNavigationForRole = (role: Role): SidebarItem[] =>
  sidebarNavigation[role] ?? sidebarNavigation[ROLES.FAMILY_MEMBER];
