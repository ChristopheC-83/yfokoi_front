import { create } from "zustand";
import {
  fetchFriends,
  fetchSentRequests,
  fetchReceivedRequests,
  fetchBlockedUsers,
  sendFriendRequest,
  cancelRequest,
  breakLink,
  acceptFriendRequest,
  declineFriendRequest,
} from "@/services/links/usersLinks";
import type { Friends } from "@/types/Friends";

interface UserLinksState {
  friends: Friends;
  pendingSentRequests: Friends;
  receivedRequests: Friends;
  blockedUsers: Friends;
  isLoading: boolean;

  fetchUserLinks: () => Promise<void>;
  sendRequest: (userId: number, name: string) => Promise<void>;
  acceptRequest: (fromId: number) => Promise<void>;
  declineRequest: (fromId: number) => Promise<void>;
  cancelRequest: (fromId: number) => Promise<void>;
  breakLink: (fromId: number) => Promise<void>;
  unblockUser: (fromId: number) => Promise<void>;
}

export const useUserLinksStore = create<UserLinksState>((set) => ({
  friends: [],
  pendingSentRequests: [],
  receivedRequests: [],
  blockedUsers: [],
  isLoading: false,

  fetchUserLinks: async () => {
    set({ isLoading: true });
    try {
      const [friends, sent, received, blocked] = await Promise.all([
        await fetchFriends(),
        await fetchSentRequests(),
        await fetchReceivedRequests(),
        await fetchBlockedUsers(),
      ]);
      set({
        friends: friends,
        pendingSentRequests: sent,
        receivedRequests: received,
        blockedUsers: blocked,
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

  acceptRequest: async (fromId: number) => {
    try {
      await acceptFriendRequest(fromId);

      set((state) => {
        const acceptedUser = state.receivedRequests.find(
          (u) => u.id === fromId
        );
        if (!acceptedUser) return {};

        return {
          receivedRequests: state.receivedRequests.filter(
            (user) => user.id !== fromId
          ),
          friends: [...state.friends, acceptedUser],
        };
      });
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la demande :", error);
    }
  },

  declineRequest: async (fromId: number) => {
    try {
      await declineFriendRequest(fromId);

      set((state) => ({
        receivedRequests: state.receivedRequests.filter(
          (user) => user.id !== fromId
        ),
      }));
    } catch (error) {
      console.error("Erreur lors du refus de la demande :", error);
    }
  },

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
  breakLink: async (fromId: number) => {
    try {
      await breakLink(fromId);

      set((state) => ({
        friends: state.friends.filter((request) => request.id !== fromId),
      }));
    } catch (error) {
      console.error("Erreur lors de l'annulation de la demande :", error);
    }
  },
  unblockUser: async (fromId: number) => {
  try {
    await breakLink(fromId);
    const updatedBlockedUsers = await fetchBlockedUsers();
    set({ blockedUsers: updatedBlockedUsers });
  } catch (error) {
    console.error("Erreur lors du déblocage :", error);
  }
}
}));
