export type User = {
  id: number | string;
  name: string;
  email: string;
};

export type UserContextData = {
  selectedListId: number | null;
    favoriteListId: number | null;
    countAskFriends: number;
    };