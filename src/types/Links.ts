export type FriendStatus = 'pending' | 'accepted' | 'declined';


export interface UserLink {
  user1_id: number;
  user2_id: number;
  status: FriendStatus;
  creaeted_at : Date;
}
