import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Friends } from "@/types/Friends";
import { URL_API } from "@/utils/env";

const getToken = () => useAuthStore.getState().token;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) throw new Error(`Failed request: ${url} – ${res.status}`);
  return res;
};

export const fetchFriends = async (): Promise<Friends> => {
  const res = await fetchWithAuth(`${URL_API}/api_links/getMyFriends`, {
    method: "GET",
  });
  const friends = await res.json();
  // console.log("Received friends:", friends);
  return friends;
};

export const fetchSentRequests = async (): Promise<Friends> => {
  const res = await fetchWithAuth(`${URL_API}/api_links/sentRequest`, {
    method: "GET",
  });
  const pendingSentRequests = await res.json();
  // console.log("Received friends:", pendingSentRequests);
  return pendingSentRequests;
};

export const fetchReceivedRequests = async (): Promise<Friends> => {
  const res = await fetchWithAuth(`${URL_API}/api_links/receivedRequest`, {
    method: "GET",
  });
  const pendingSentRequests = await res.json();
  // console.log("Received friends:", pendingSentRequests);
  return pendingSentRequests;
};

// export const sendFriendRequest = async (toId: number): Promise<void> => {
//   await fetchWithAuth(`${URL_API}/api_links/request`, {
//     method: "POST",
//     body: JSON.stringify({ to_id: toId }),
//   });
// };

// export const acceptFriendRequest = async (fromId: number): Promise<void> => {
//   await fetchWithAuth(`${URL_API}/api_links/accept`, {
//     method: "POST",
//     body: JSON.stringify({ from_id: fromId }),
//   });
// };

// export const declineFriendRequest = async (fromId: number): Promise<void> => {
//   await fetchWithAuth(`${URL_API}/api_links/decline`, {
//     method: "POST",
//     body: JSON.stringify({ from_id: fromId }),
//   });
// };
