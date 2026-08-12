export interface InvitationPrefill {
  fullName: string;
  email: string;
}

export function getInvitationPrefill(search: string): InvitationPrefill {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);

  const fullName =
    params.get("name") ??
    params.get("fullName") ??
    params.get("full_name") ??
    "";

  const email = params.get("email") ?? "";

  return {
    fullName: fullName.trim(),
    email: email.trim(),
  };
}
