export type Permissions = {
    canRead: boolean; // Can read items in the list
    canCreate: boolean; // Can create items in the list
    canCrudOwn: boolean; // Can read, update, delete own items in the list
    canCrudAll: boolean; // Can read, update, delete all items in the list
    isOwner: boolean; // Is the user the owner of the list
    };