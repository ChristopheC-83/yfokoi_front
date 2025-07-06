export type Action =
  | "link"         // niveau 1
  | "read"         // niveau 2+
  | "create"       // niveau 2+
  | "update_own"   // niveau 3+
  | "delete_own"
  | "update_all"   // niveau 4
  | "delete_all";
