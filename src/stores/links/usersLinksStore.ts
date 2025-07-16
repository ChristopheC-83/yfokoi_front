import { create } from "zustand";
import {
  fetchFriends,
  fetchSentRequests,
  fetchReceivedRequests,
  // sendFriendRequest,
  // acceptFriendRequest,
  // declineFriendRequest,
} from "@/services/links/usersLinks";
import type { Friends } from "@/types/Friends";

interface UserLinksState {
  friends: Friends;
  pendingSentRequests: Friends;
  receivedRequests: Friends;
  isLoading: boolean;

  fetchUserLinks: () => Promise<void>;
  // sendRequest: (userId: number) => Promise<void>;
  // acceptRequest: (fromId: number) => Promise<void>;
  // declineRequest: (fromId: number) => Promise<void>;
  // cancelRequest: (fromId: number) => Promise<void>;
  // breakLink: (fromId: number) => Promise<void>;
}

export const useUserLinksStore = create<UserLinksState>((set) => ({
  friends: [],
  pendingSentRequests: [],
  receivedRequests: [],
  isLoading: false,

  fetchUserLinks: async () => {
    set({ isLoading: true });
    try {
      const [friends, sent, received] = await Promise.all([
        await fetchFriends(),
        await fetchSentRequests(),
        await fetchReceivedRequests(),
      ]);
      set({
        friends: friends,
        pendingSentRequests: sent,
        receivedRequests: received,
      });
    } catch (error) {
      console.error("Failed to fetch user links:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // sendRequest: async (userId: number) => {
  //   await sendFriendRequest(userId);
  //   await get().fetchUserLinks();
  // },

  // acceptRequest: async (fromId: number) => {
  //   await acceptFriendRequest(fromId);
  //   await get().fetchUserLinks();
  // },

  // declineRequest: async (fromId: number) => {
  //   await declineFriendRequest(fromId);
  //   await get().fetchUserLinks();
  // },

  // cancelRequest: async (fromId: number) => {
  //   await cancelRequest(fromId);
  //   await get().fetchUserLinks();
  // },
  // breakLink: async (fromId: number) => {
  //   await breakLink(fromId);
  //   await get().fetchUserLinks();
  // },
}));
