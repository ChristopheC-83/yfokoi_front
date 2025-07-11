import { fetchItemsByList } from "@/services/items/fetchItemsByList";
import sendItemToDB from "@/services/items/sendItemToDB";
import { useItemsStore } from "@/stores/items/useItemsStore";
import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import type { AccessList, OwnedList } from "@/types/List";
import { useState } from "react";
import { toast } from "sonner";

interface AddToListProps {
  currentList: OwnedList | AccessList;
}

export default function AddToList({ currentList }: AddToListProps) {
  const { itemsByListId, setItemsForList } =
    useItemsStore();
  const user = useAuthStore((state) => state.user);
  const userId = Number(useAuthStore((state) => state.user?.id));

  const [newItem, setNewItem] = useState<string>("");

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();

    // Nettoyage de la chaîne
    const trimmedItem = newItem.trim();

    // Vérif : item non vide
    if (!trimmedItem) {
      toast.error("L'élément ne peut pas être vide.");
      return;
    }

    // Vérif : item déjà présent dans la liste
    const currentItems = itemsByListId[currentList.id] || [];
    const alreadyExists = currentItems.some(
      (item) => item.content.toLowerCase() === trimmedItem.toLowerCase()
    );

    if (alreadyExists) {
      toast.warning("Cet élément existe déjà dans la liste.");
      return;
    }

    // Création de l’item temporaire avec ID unique local
    const tempId = Date.now();
    const newItemToApi: Item = {
      id: tempId,
      content: newItem,
      is_done: false,
      id_list: currentList.id,
      created_at: new Date(),
      created_by: userId,
      author_name: user?.name ?? "Moi",
      author_email: user?.email ?? "inconnu@yolo.com",
    };

    // Ajout immédiat dans le store (optimiste)
    // setItemsForList(currentList.id, [...currentItems, newItemToApi]);

    // Tentative d'envoi à la DB
    if (await sendItemToDB(newItemToApi)) {
      const newList = await fetchItemsByList(currentList.id);
      // console.log("newList", newList);
      setItemsForList(currentList.id, newList);
    }

    toast.success("Élément ajouté avec succès !");
    setNewItem(""); // Nettoyage du champ
  }

  return (
    <form
      className="w-[96vw] mx-auto max-w-[800px] flex justify-between items-center my-2 gap-x-3"
      onSubmit={handleAddItem}
    >
      <input
        type="text"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-md rounded block  w-full p-2 `}
        value={newItem}
        placeholder="Ajouter un nouvel élément à la liste"
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit" className="text-4xl mb-1 p-2 pr-0 cursor-pointer">
        ✅
      </button>
    </form>
  );
}
