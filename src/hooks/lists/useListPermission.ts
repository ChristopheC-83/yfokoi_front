import { hasPermission } from "@/services/items/testsAccess";
import type { AccessList, OwnedList } from "@/types/List";

export function useListPermissions(
  userId: number | undefined,
  currentList: OwnedList | AccessList | null
) {
  const isOwner = userId !== undefined && currentList?.owner_id === userId;

  const can = (action: "read" | "create" | "update_own" | "update_all") =>
    userId !== undefined ? hasPermission(userId, currentList, action) : false;

  return {
    isOwner,
    canRead: isOwner || can("read"),
    canCreate: isOwner || can("create"),
    canCrudOwn: isOwner || can("update_own"),
    canCrudAll: isOwner || can("update_all"),
  };
}
