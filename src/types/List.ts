export type OwnedList = {
  id: number;
  name: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
  is_archived: number;
};

export type AccessList = OwnedList & {
  access_id: number;
  author_id: number;
  author_name: string;
  user_id: number;
  list_id: number;
  access_level: number;
};
