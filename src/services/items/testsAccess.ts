import type { AccessList, OwnedList } from "@/types/List";

export function hasPermission(
  userId: number,
  list: OwnedList | AccessList | null,
  action: "read" | "create" | "update_own" | "update_all"
): boolean {
  if (!list) return false;

  const isOwner = list.owner_id === userId;
  const accessLevel = "access_level" in list ? list.access_level : 4;

  if (isOwner) return true;

  switch (action) {
    case "read":
      return accessLevel >= 1;
    case "create":
      return accessLevel >= 2;
    case "update_own":
      return accessLevel >= 3;
    case "update_all":
      return accessLevel >= 4;
    default:
      return false;
  }
}
