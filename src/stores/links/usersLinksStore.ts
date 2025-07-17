import { create } from "zustand";
import {
  fetchFriends,
  fetchSentRequests,
  fetchReceivedRequests,
  sendFriendRequest,
  cancelRequest,
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
  sendRequest: (userId: number, name: string) => Promise<void>;
  // acceptRequest: (fromId: number) => Promise<void>;
  // declineRequest: (fromId: number) => Promise<void>;
  cancelRequest: (fromId: number) => Promise<void>;
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

  sendRequest: async (userId: number, name: string) => {
    try {
      await sendFriendRequest(userId);
      // Ajouter directement le user dans le state pendingSentRequests
      set((state) => ({
        pendingSentRequests: [
          ...state.pendingSentRequests,
          { id: userId, name }, // Tu peux ajouter avatar si dispo
        ],
      }));
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande :", error);
    }
  },

  // acceptRequest: async (fromId: number) => {
  //   await acceptFriendRequest(fromId);
  //   await get().fetchUserLinks();
  // },

  // declineRequest: async (fromId: number) => {
  //   await declineFriendRequest(fromId);
  //   await get().fetchUserLinks();
  // },

  cancelRequest: async (fromId: number) => {
    try {
      await cancelRequest(fromId);

      set((state) => ({
        pendingSentRequests: state.pendingSentRequests.filter(
          (request) => request.id !== fromId
        ),
      }));
    } catch (error) {
      console.error("Erreur lors de l'annulation de la demande :", error);
    }
  },
  // breakLink: async (fromId: number) => {
  //   await breakLink(fromId);
  //   await get().fetchUserLinks();
  // },
}));
