import { create } from "zustand";
import type { Author } from "@/types/Author";

interface AuthorsStore {
  authors: Record<number, Author>; // Cache local indexé par ID
  fetchAuthorById: (id: number, token: string) => Promise<void>;
  getAuthorById: (id: number) => Author | undefined;
  setAuthors: (authors: Author[]) => void;
  resetAuthors: () => void;
}

export const useAuthorsStore = create<AuthorsStore>((set, get) => ({
  authors: {},

  setAuthors: (authors) => {
    const mapped = authors.reduce((acc, author) => {
      acc[author.id] = author;
      return acc;
    }, {} as Record<number, Author>);
    set({ authors: mapped });
  },

  fetchAuthorById: async (id, token) => {
    if (get().authors[id]) return; // déjà en cache, pas de fetch

    try {
      const res = await fetch(`/api/authors/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP ${res.status}`);
      }

      const data: Author = await res.json();

      set((state) => ({
        authors: { ...state.authors, [data.id]: data },
      }));
    } catch (error) {
      console.error(`❌ Erreur lors du fetch de l’auteur ${id}`, error);
      throw error;
    }
  },

  getAuthorById: (id) => get().authors[id],

  resetAuthors: () => set({ authors: {} }),
}));
