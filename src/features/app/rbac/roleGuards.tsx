import type { ReactNode } from "react";
import { type Role } from "./roles";
import type { Permission } from "./permissions";
import { hasPermission } from "./permissions";

export const canPerform = (role: Role, permission: Permission): boolean =>
  hasPermission(role, permission);

export const canPerformAny = (role: Role, permissions: Permission[]): boolean =>
  permissions.some((permission) => canPerform(role, permission));

export const requirePermission = (role: Role, permission: Permission): void => {
  if (!canPerform(role, permission)) {
    throw new Error(
      `Role \"${role}\" is not allowed to perform permission \"${permission}\".`
    );
  }
};

export interface RoleGuardProps {
  role: Role;
  allowedRoles: Role[];
  fallback?: ReactNode;
  children?: ReactNode;
}

export function RoleGuard({
  role,
  allowedRoles,
  fallback = null,
  children,
}: RoleGuardProps) {
  return allowedRoles.includes(role) ? <>{children}</> : <>{fallback}</>;
}

export const routeGuard = (role: Role, requiredPermissions: Permission[]): boolean =>
  requiredPermissions.every((permission) => canPerform(role, permission));
